import { Box } from '@mui/material';
import { AccountPopover } from 'src/layouts/components/account-popover';
import { route } from 'src/utils/constants/routes';
import { Iconify } from '../iconify';

export const AuthNavbar = () => {
  return (
    <Box gap={1} display="flex" alignItems="center">
      {/* <Searchbar />
      <LanguagePopover data={_langs} />
      <NotificationsPopover data={_notifications} /> */}
      <AccountPopover data={menuData} />
    </Box>
  );
};

const menuData = [
  {
    label: 'Home',
    href: route.dashboard,
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
  },
  {
    label: 'Change Password',
    href: route.changePassword,
    icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
  },
  {
    label: 'Settings',
    href: route.settings,
    icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
  },
];
