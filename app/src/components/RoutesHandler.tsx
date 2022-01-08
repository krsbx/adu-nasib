import React from 'react';
import { Route } from 'react-router-dom';
import { IRoutes } from 'utils/routes/routesInterfaces';
import RouteContainer from './Container';

const RoutesHandler = (routes: IRoutes[], isLogin: string, isPublic = true) => {
  const { PrivateContainer, ProtectedContainer, PublicContainer } =
    RouteContainer;

  return routes.map(({ component: Component, path }) => (
    <Route
      path={path}
      key={path}
      element={
        isPublic ? (
          <PublicContainer isLogin={isLogin}>
            <Component />
          </PublicContainer>
        ) : (
          <ProtectedContainer isLogin={isLogin}>
            <PrivateContainer>
              <Component />
            </PrivateContainer>
          </ProtectedContainer>
        )
      }
    />
  ));
};

export default RoutesHandler;
