import React from 'react';

export interface IRoutes {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}
