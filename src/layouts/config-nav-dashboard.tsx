import { SvgColor } from 'src/components/svg-color';
import { route } from 'src/utils/constants/routes';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: route.dashboard,
    icon: icon('ic-analytics'),
  },
  // {
  //   title: 'User',
  //   path: '/user',
  //   icon: icon('ic-user'),
  // },
  // {
  //   title: 'Product',
  //   path: '/products',
  //   icon: icon('ic-cart'),
  //   info: (
  //     <Label color="error" variant="inverted">
  //       +3
  //     </Label>
  //   ),
  // },
  {
    title: 'Reports',
    path: route.reports,
    icon: icon('ic-blog'),
  },
  {
    title: 'Activities',
    path: route.activities,
    icon: icon('ic-blog'),
  },
  {
    title: 'Settings',
    path: route.settings,
    icon: icon('ic-blog'),
  },
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  // },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic-disabled'),
  // },
];
