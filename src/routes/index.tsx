import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import Otp from 'src/pages/otp';

// ----------------------------------------------------------------------

const Dashboard = lazy(() => import('src/pages/dashboard'));
const SignInPage = lazy(() => import('src/pages/sign-in'));
const SignUpPage = lazy(() => import('src/pages/sign-up'));

const GymOwnerPage = lazy(() => import('src/pages/gym-owner'));
const CoachPage = lazy(() => import('src/pages/coach'));
const ParentPage = lazy(() => import('src/pages/parent'));
const SingleUserPage = lazy(() => import('src/pages/single-user'));

const HomePage = lazy(() => import('src/pages/home'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export const router = createBrowserRouter([
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
    path: '/',
    element: <AuthLayout />,

    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/otp', element: <Otp /> },
      { path: '/sign-up', element: <SignUpPage /> },
      { path: '/gym-owner', element: <GymOwnerPage /> },
      { path: '/coach', element: <CoachPage /> },
      { path: '/parent', element: <ParentPage /> },
      { path: '/single-user', element: <SingleUserPage /> },
    ],
  },

  { path: '404', element: <Page404 /> },
  { path: '*', element: <Navigate to="/404" replace /> },
]);
