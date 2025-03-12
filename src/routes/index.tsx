import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/home'));
const Dashboard = lazy(() => import('src/pages/dashboard'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const SignInPage = lazy(() => import('src/pages/sign-in'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export const router = createBrowserRouter([
  { path: '/dashboard', element: <Dashboard /> },

  {
    path: '/',
    element: <DashboardLayout />,

    children: [
      { index: true, element: <HomePage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
    ],
  },

  {
    path: '/sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },

  { path: '404', element: <Page404 /> },
  { path: '*', element: <Navigate to="/404" replace /> },
]);
