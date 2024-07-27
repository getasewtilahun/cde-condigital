import { MODULES } from "../constants/Constants";

/**
 * Routes
 */

export const RouteConstants: ConstantProps = {
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  USER_MANAGEMENT: "/user-management/:tab",
  PROJECTS: "/projects",
  PROJECT: "/project/:id/:tab",
  USER_ASSIGNMENT: "/project/:id/user-assignment",

};

export interface ConstantProps {
  [state: string]: string; //indexer
}
interface ModuleProps {
  [state: string]: string[]; //indexer
}

export const MODULES_ROUTES: ModuleProps = {
  [MODULES.PROCUREMENT]: [RouteConstants.PROCUREMENT],
  [MODULES.INVENTORY]: [RouteConstants.INVENTORY],
};
