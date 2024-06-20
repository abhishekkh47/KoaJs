import AuthController from "@controllers/v1/auth";
import HealthCheckController from "@controllers/v1/healthcheck";
import { getRouteDict } from "@app/utility";

const routeDict = getRouteDict("1.0.0", [
  AuthController,
  HealthCheckController,
]);

export default routeDict;
