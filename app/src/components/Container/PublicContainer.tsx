import React, { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type props = {
  isLogin: string;
};

const PublicContainer: React.FC<props> = ({ children, isLogin }) => {
  const location = useLocation();

  if (isLogin) return <Navigate to="/dashboard" state={{ from: location }} />;

  return <Suspense fallback={<>Loading...</>}>{children}</Suspense>;
};

export default PublicContainer;
