import React, {
  Suspense,
  Fragment,
  lazy,
  type LazyExoticComponent,
  type ComponentType
} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadScreen from './component/loaderScreen'
import Authenticated from './guard/Authenticated'
import Guest from './guard/Guest'
import Header from './component/navbar/Navbar'
import Navbar from './component/navbar/Navbar'

interface AppRoute {
  path: string
  element: LazyExoticComponent<ComponentType<any>>
  guard?: React.ComponentType<any>
  layout?: React.ComponentType<any>
  auth?: React.ComponentType<any>
}

const routes: AppRoute[] = [
  // Guest routes (only accessible when not logged in)
  {
    guard: Guest,
    path: '/register',
    element: lazy(() => import('./component/pages/register/index'))
  },
  {
    guard: Guest,
    path: '/login',
    element: lazy(() => import('./component/pages/login/login'))
  },
  {
    guard: Guest,
    path: '/signin',
    element: lazy(() => import('./component/pages/dashboard/profile/SignIn'))
  },

  // Public routes (accessible to everyone)
  {
    path: '/',
    element: lazy(() => import('./component/pages/home/NewHome'))
  },
  {
    path: '/templates',
    element: lazy(() => import('./component/pages/template/TemplatesLanding'))
  },
  {
    path: '/card',
    element: lazy(() => import('./component/pages/template/Card'))
  },
  {
    path: '/landingPage',
    element: lazy(() => import('./component/pages/template/landingPage'))
  },
  // {
  //   path: '/Footer',
  //   element: lazy(() => import('./component/pages/template/Footer'))
  // },
  // {
  //   path: '/Navbar',
  //   element: lazy(() => import('./component/navbar/Navbar'))
  // },

  {
    path: '/templates/:templateId/preview',
    element: lazy(() => import('./component/pages/template/TemplatePreview'))
  },

  // Public profile view (no authentication required)
  {
    path: '/dashboard/profile/:id',
    element: lazy(() => import('./component/pages/dashboard/profile/index'))
  },

  // Protected routes (only accessible when logged in)
  {
    guard: Authenticated,
    // layout: Header,
    path: '/templates/:templateId/customize',
    element: lazy(() => import('./component/pages/template/TemplateCustomizer'))
  },
  {
    guard: Authenticated,
    // layout: Header,
    path: '/dashboard/profile/:id',
    element: lazy(() => import('./component/pages/dashboard/Index'))
  },
  {
    guard: Authenticated,
    layout: Header,
    path: '/admin/DashBoard',
    element: lazy(() => import('./component/pages/admin/Dashboard'))
  },
  {
    guard: Authenticated,
    // layout: Header,
    path: '/updateProfile/:id',
    element: lazy(() => import('./component/pages/updateProfile/Index'))
  },
  {
    guard: Authenticated,
    // layout: Header,
    path: '/links',
    element: lazy(() => import('./component/pages/links/Index'))
  },
  {
    guard: Authenticated,
    // layout: Header,
    path: '/changepassword',
    element: lazy(() => import('./component/pages/password/Index'))
  },
  {
    guard: Authenticated,
    // layout: Header,
    path: '/deleteAccount',
    element: lazy(() => import('./component/pages/accountDelete/Index'))
  },
  {
    guard: Authenticated,
    // layout: Header,
    path: '/dashboard/:layout/:id',
    element: lazy(() => import('./component/pages/dashboard/Index'))
  },
  {
    guard: Authenticated,
    // layout: Header,
    path: '/admin/users',
    element: lazy(() => import('./component/pages/admin/Users'))
  },
  {
    guard: Authenticated,
    layout: Header,
    path: '/admin/reports',
    element: lazy(() => import('./component/pages/admin/Reports'))
  },
  {
    guard: Authenticated,
    layout: Header,
    path: '/settings',
    element: lazy(() => import('./component/pages/settings/Index'))
  },
  {
    guard: Authenticated,
    // layout: Header,
    path: '/dasboard',
    element: lazy(() => import('./component/pages/dashboard/DashboardSidebar'))
  },

  // Catch all route - 404 page
  {
    path: '*',
    element: lazy(() => import('./component/PageNotFound'))
  }
]

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