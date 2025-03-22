export const route = Object.freeze({
  index: '/',
  user: '/user',
  products: '/products',
  blog: '/blog',
  dashboard: '/dashboard',
  signIn: '/sign-in',
  signUp: '/sign-up',
  otp: '/otp',
  forgot: '/forgot-password',
  reset: '/reset-password',
  gym: '/gym-owner',
  coach: '/coach',
  parent: '/parent',
  individual: '/individual',

  404: '404',
  '*': '*',
} as const);

export type RouteKeys = keyof typeof route;
