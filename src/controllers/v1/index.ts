import AuthController from "@controllers/v1/auth";
import HealthCheckController from "@app/controllers/v1/admin";
import { getRouteDict } from "@app/utility";

const routeDict = getRouteDict("1.0.0", [
  AuthController,
  HealthCheckController,
]);

export default routeDict;
