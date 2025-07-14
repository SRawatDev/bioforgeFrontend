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
    // guard: Authenticated,
    // layout: Header,
    path: '/profile/:id',
    element: lazy(() => import('./component/pages/profile/index'))
  },
  {
    guard: Authenticated,

    path: '/updateProfile/:id',
    element: lazy(() => import('./component/pages/updateProfile/Index'))
  },
  {

    guard: Authenticated,
    path: '/link',
    element: lazy(() => import('./component/pages/links/Index'))
  },
  {

    guard: Authenticated,
    path: '/changepassword',
    element: lazy(() => import('./component/pages/password/Index'))
  },
  {

    guard: Authenticated,
    path: '/deleteAccount',
    element: lazy(() => import('./component/pages/accountDelete/Index'))
  },
  {
    // layout: Header,
    guard: Authenticated,
    path: 'dashBoard/:layout/:id',
    element: lazy(() => import('./component/pages/dashboard/Index'))
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
