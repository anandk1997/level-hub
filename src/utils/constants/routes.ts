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
  gym: '/gym-owner',
  coach: '/coach',
  parent: '/parent',
  individual: '/individual',
  welcome: '/welcome',
  welcomeBack: '/welcome-back',

  404: '404',
  '*': '*',
} as const);

export type RouteKeys = keyof typeof route;
