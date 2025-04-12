import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { SettingsLayout } from 'src/layouts/settings';
import { route } from 'src/utils/constants/routes';

// ----------------------------------------------------------------------

const Dashboard = lazy(() => import('src/pages/dashboard'));
const SignInPage = lazy(() => import('src/pages/sign-in'));
const SignUpPage = lazy(() => import('src/pages/sign-up'));
const ForgotPassword = lazy(() => import('src/pages/forgot-password'));
const ResetPassword = lazy(() => import('src/pages/reset-password'));
const OtpSignupPage = lazy(() => import('src/pages/otp-signup'));
const OtpResetPage = lazy(() => import('src/pages/otp-reset'));

const GymOwnerPage = lazy(() => import('src/pages/gym-owner'));
const CoachPage = lazy(() => import('src/pages/coach'));
const ParentPage = lazy(() => import('src/pages/parent'));
const SingleUserPage = lazy(() => import('src/pages/single-user'));
const WelcomePage = lazy(() => import('src/pages/welcome'));
const WelcomeBackPage = lazy(() => import('src/pages/welcome-back'));

const HomePage = lazy(() => import('src/pages/home'));
const BlogPage = lazy(() => import('src/pages/blog'));
const ActivitiesPage = lazy(() => import('src/pages/activities'));
const ReportsPage = lazy(() => import('src/pages/reports'));
const AccountPage = lazy(() => import('src/pages/settings/account'));
const ChangePasswordPage = lazy(() => import('src/pages/settings/change-password'));
const TargetLevelPage = lazy(() => import('src/pages/settings/target-level'));

const UserPage = lazy(() => import('src/pages/user'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export const router = createBrowserRouter([
  {
    path: route.index,
    element: <DashboardLayout />,

    children: [
      { index: true, element: <HomePage /> },
      { path: route.user, element: <UserPage /> },
      { path: route.products, element: <ProductsPage /> },
      { path: route.blog, element: <BlogPage /> },
      { path: route.activities, element: <ActivitiesPage /> },
      { path: route.reports, element: <ReportsPage /> },

      {
        path: route.settings,
        element: <SettingsLayout />,
        children: [
          { path: route.account, element: <AccountPage /> },
          { path: route.changePassword, element: <ChangePasswordPage /> },
          { path: route.targetLevel, element: <TargetLevelPage /> },
        ],
      },
    ],
  },

  {
    path: route.index,
    element: <AuthLayout />,

    children: [
      { path: route.dashboard, element: <Dashboard /> },
      { path: route.signIn, element: <SignInPage /> },
      { path: route.signUp, element: <SignUpPage /> },
      { path: route.otpSignup, element: <OtpSignupPage /> },
      { path: route.otpReset, element: <OtpResetPage /> },
      { path: route.forgot, element: <ForgotPassword /> },
      { path: route.reset, element: <ResetPassword /> },
      { path: route.gym, element: <GymOwnerPage /> },
      { path: route.coach, element: <CoachPage /> },
      { path: route.parent, element: <ParentPage /> },
      { path: route.individual, element: <SingleUserPage /> },
      { path: route.welcome, element: <WelcomePage /> },
      { path: route.welcomeBack, element: <WelcomeBackPage /> },
    ],
  },

  { path: route[404], element: <Page404 /> },
  { path: route['*'], element: <Navigate to={route[404]} replace /> },
]);
