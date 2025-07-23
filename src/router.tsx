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
interface AppRoute {
  path: string
  element: LazyExoticComponent<ComponentType<any>>
  guard?: React.ComponentType<any>
  layout?: React.ComponentType<any>
  auth?: React.ComponentType<any>
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
    element: lazy(() => import('./component/pages/login/login'))
  },
  {
    guard: Guest,
    path: '/signin',
    element: lazy(() => import('./component/pages/dashboard/profile/SignIn'))
  },

  {
    path: '/',
    element: lazy(() => import('./component/pages/home/NewHome'))
  },
  {
    path: '/navbar',
    element: lazy(() => import('./component/navbar/Navbar'))
  },

  {
    path: '/card',
    element: lazy(() => import('./component/pages/template/Card'))
  },
  {
    path: '/landingPage',
    element: lazy(() => import('./component/pages/template/landingPage'))
  },
  {
    path: '/about',
    element: lazy(() => import('./component/pages/about/About'))
  },
  {
    path: '/dashboard/profile/:id',
    element: lazy(() => import('./component/pages/dashboard/profile/index'))
  },

  {
    guard: Authenticated,
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
    path: '/updateProfile/:id',
    element: lazy(() => import('./component/pages/updateProfile/Index'))
  },
  {
    guard: Authenticated,
    path: '/links',
    element: lazy(() => import('./component/pages/links/Index'))
  },
  {
    guard: Authenticated,
    path: '/dashboard/changepassword/:id',
    element: lazy(() => import('./component/pages/dashboard/password/Index'))
  },
  {
    guard: Authenticated,
    path: '/deleteAccount',
    element: lazy(() => import('./component/pages/accountDelete/Index'))
  },
  {
    guard: Authenticated,
    path: '/dashboard/:layout/:id',
    element: lazy(() => import('./component/pages/dashboard/Index'))
  },
  {
    guard: Authenticated,
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
    path: '/dasboard',
    element: lazy(() => import('./component/pages/dashboard/DashboardSidebar'))
  },

  {
    path: '*',
    element: lazy(() => import('./component/PageNotFound'))
  }
]

export function RenderRout () {
  return (
    <Router>
      <Suspense fallback={<LoadScreen />}>
        <Routes>
          {routes.map((route, i) => {
            const Guard = route.guard || Fragment
            const Auth = route.auth || Fragment
            const Layout = route.layout || Fragment
            const Component = route.element

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
            )
          })}
        </Routes>
      </Suspense>
    </Router>
  )
}
