import { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import { RouteConstants } from "./Constants";
import ErrorBoundary from "../containers/Errors/ErrorBoundary/ErrorBoundary.component";
import { checkRouteAuthorization, isLoggedIn } from "../utilities/utilities";
import Layout from "../containers/Layouts/Layout/Layout.component";
import LoadingIndicator from "../components/common/Loading";
import Project from "../components/Project";
import ProjectMenuComponent from "../components/ProjectMenu";
import ProjectAssignmentComponent from "../components/ProjectMenu/ProjectAssignment";

const UserManagementComponent = lazy(
  () => import("../containers/UserManagement")
);
const EnterpriseLoginComponent = lazy(() => import("../components/Login"));
const SignupComponent = lazy(() => import("../components/Signup"));
const Routes = () => {

  const PrivateRoute = ({ ...props }: any) => {
    const { children, ...rest } = props;
    const isAuthenticated = isLoggedIn();

    let isAuthorized: any = false;
    if (isAuthenticated) {
      isAuthorized = checkRouteAuthorization(rest.path);
    }

    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated && isAuthorized ? (
            children
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )
        }
      />
    );
  };

  return (
    <>
      <ErrorBoundary>
        <Switch>
          <Route exact path={RouteConstants.LOGIN}>
            <Suspense fallback={<LoadingIndicator />}>
              <EnterpriseLoginComponent />
            </Suspense>
          </Route>
          <Route exact path={RouteConstants.SIGN_UP}>
            <Suspense fallback={<LoadingIndicator />}>
              <SignupComponent />
            </Suspense>
          </Route>

          <PrivateRoute exact path={RouteConstants.USER_MANAGEMENT}>
            <Layout>
              <Suspense fallback={<LoadingIndicator />}>
                <UserManagementComponent />
              </Suspense>
            </Layout>
          </PrivateRoute>
          <PrivateRoute exact path={RouteConstants.USER_ASSIGNMENT}>
            <Layout>
              <Suspense fallback={<LoadingIndicator />}>
                <ProjectAssignmentComponent />
              </Suspense>
            </Layout>
          </PrivateRoute>
          <PrivateRoute exact path={RouteConstants.PROJECTS}>
            <Layout>
              <Suspense fallback={<LoadingIndicator />}>
                <Project />
              </Suspense>
            </Layout>
          </PrivateRoute>
          <PrivateRoute exact path={RouteConstants.PROJECT}>
            <Layout>
              <Suspense fallback={<LoadingIndicator />}>
                <ProjectMenuComponent />
              </Suspense>
            </Layout>
          </PrivateRoute>
          <PrivateRoute exact path={"*"}>
            <Redirect to={{ pathname: RouteConstants.PROJECTS }} />
          </PrivateRoute>
        </Switch>
      </ErrorBoundary>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(Routes);
