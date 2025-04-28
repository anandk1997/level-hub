export const route = Object.freeze({
  index: '/',
  user: '/user',
  products: '/products',
  blog: '/blog',
  dashboard: '/dashboard',

  signIn: '/sign-in',
  signUp: '/sign-up',
  otpSignup: '/otp-signup',
  otpReset: '/otp-reset',
  forgot: '/forgot-password',
  reset: '/reset-password',

  gym: '/gym',
  coach: '/coach',
  parent: '/parent',
  individual: '/individual',

  welcome: '/welcome',
  welcomeBack: '/welcome-back',

  activities: '/activities',
  activity: '/activities/:id',
  reports: '/reports',

  templates: '/templates',

  settings: '/settings',
  account: '/settings/account',
  changePassword: '/settings/change-password',
  targetLevel: '/settings/target-level',

  404: '/404',
  '*': '*',
} as const);

export type RouteKeys = keyof typeof route;
