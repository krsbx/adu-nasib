import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoutesHandler from 'components/RoutesHandler';
import publicRoutes from 'utils/routes/public';
import privateRoutes from 'utils/routes/private';
import { useLocalStorage } from 'krsbx-hooks';
import NotFoundPage from 'views/NotFoundPage';

function App() {
  const [isLogin] = useLocalStorage('access_token');

  return (
    <BrowserRouter>
      <Routes>
        <React.Fragment>
          {RoutesHandler(publicRoutes, isLogin)}
          {RoutesHandler(privateRoutes, isLogin, false)}
          <Route path="/*" element={<NotFoundPage />} />
        </React.Fragment>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
