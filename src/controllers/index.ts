import Compose from "koa-compose";
import Router from "koa-router";
const KoaRouterVersion = require("koa-router-version");

import { IRouteDict } from "@app/utility";
import routerDictV1 from "./v1";
import { HttpMethod } from "@app/types";

const router = new Router();

const methodToRouter = {
  [HttpMethod.HEAD]: router.head,
  [HttpMethod.OPTIONS]: router.options,
  [HttpMethod.GET]: router.get,
  [HttpMethod.PUT]: router.put,
  [HttpMethod.PATCH]: router.patch,
  [HttpMethod.POST]: router.post,
  [HttpMethod.DELETE]: router.delete,
};

const setRoutes = (router: Router, routeDicts: IRouteDict[]) => {
  // Get all of the route keys.
  let routeKeys: string[] = [].concat.apply(
    [],
    routeDicts.map((dict) => Object.keys(dict))
  );
  routeKeys = [...new Set(routeKeys)];

  routeKeys.forEach((routeKey: string) => {
    // Get the routes for this key for all of the versions
    const routesForKey = routeDicts
      .map((routeDict) => routeDict[routeKey])
      .filter(Boolean);
    if (!routesForKey.length) {
      return;
    }

    const mergedRoutesForKey = routesForKey.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.version]: cur.handler,
      }),
      {}
    );
    const firstRouteForKey =
      routesForKey.filter((x) => x.version === "1.0.0")[0];
    const routeRegisterHandler = methodToRouter[firstRouteForKey.method];

    // Use this line to dump the merged routes
    console.log(
      "-------------",
      firstRouteForKey.method,
      firstRouteForKey.path,
      mergedRoutesForKey
    );

    const { middleware } = firstRouteForKey;
    const path = "/:version(v\\d)?" + firstRouteForKey.path;
    const versionedRoutes = KoaRouterVersion.version(mergedRoutesForKey, {
      fallbackLatest: true,
    });

    if (middleware) {
      if (Array.isArray(middleware)) {
        routeRegisterHandler.call(router, path, ...middleware, versionedRoutes);
      } else {
        routeRegisterHandler.call(router, path, middleware, versionedRoutes);
      }
    } else {
      routeRegisterHandler.call(router, path, versionedRoutes);
    }
  });
};

setRoutes(router, [
  routerDictV1
]);

export default Compose([router.routes(), router.allowedMethods()]);
