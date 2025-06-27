import React, { Suspense, Fragment, lazy, type LazyExoticComponent, type ComponentType } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadScreen from './component/loaderScreen';
import Authenticated from './guard/Authenticated';
import Guest from './guard/Guest';
interface AppRoute {
  path: string;
  element: LazyExoticComponent<ComponentType<any>>;
  guard?: React.ComponentType<any>;
  layout?: React.ComponentType<any>;
  auth?: React.ComponentType<any>;
}
const routes: AppRoute[] = [
  {
    guard: Guest,
    path: '/register',
    element: lazy(() => import('./component/pages/register/index'))
  },
  {
    guard: Guest,
    path: '/login',
    element: lazy(() => import('./component/pages/login/index'))
  },
  {
    guard: Guest,
    path: '/',
    element: lazy(() => import('./component/pages/home/index'))
  },
  {
    path: '*',
    element: lazy(() => import('./component/PageNotFound'))
  }
];

export function RenderRout() {
  return (
    <Router>
      <Suspense fallback={<LoadScreen />}>
        <Routes>
          {routes.map((route, i) => {
            const Guard = route.guard || Fragment;
            const Auth = route.auth || Fragment;
            const Layout = route.layout || Fragment;
            const Component = route.element;

            return (
              <Route
                key={i}
                path={route.path}
                element={
                  <Guard>
                    <Auth>
                      <Layout>
                        <Component />
                      </Layout>
                    </Auth>
                  </Guard>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
}
