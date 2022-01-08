import { lazy } from 'react';
import { IRoutes } from './routesInterfaces';

const routes: IRoutes[] = [
  {
    path: '/',
    component: lazy(() => import('views/home')),
  },
];

export default routes;
