import { Assessment } from '@mui/icons-material';
import ExtensionIcon from '@mui/icons-material/Extension';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
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
  {
    title: 'Invitations',
    path: route.invites,
    icon: <MarkEmailReadIcon />,
  },
  {
    title: 'Users',
    path: route.users,
    icon: <AccessibilityNewIcon />,
  },
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
    icon: <Assessment />,
  },
  {
    title: 'Activities',
    path: route.activities,
    icon: <ExtensionIcon />,
  },
  {
    title: 'Templates',
    path: route.templates,
    icon: <ManageHistoryIcon />,
  },
  {
    title: 'Settings',
    path: route.settings,
    icon: <SettingsIcon />,
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
