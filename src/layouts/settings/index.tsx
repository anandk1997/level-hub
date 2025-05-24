import { Drawer, Typography } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
import { cn } from 'src/utils';
import { route } from 'src/utils/constants/routes';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AccountCircle, LockOpen, Payment, TrackChanges } from '@mui/icons-material';

export const SettingsLayout = () => {
  const { pathname } = useLocation();
  const router = useRouter();

  const [isDrawer, setIsDrawer] = useReducer((open) => !open, false);

  useEffect(() => {
    if (pathname === route.settings) router.push(route.account);
  }, [pathname]);

  return (
    <div className="flex flex-col md:flex-row">
      <button className="md:hidden flex ms-3 mt-2 cursor-pointer w-2" onClick={setIsDrawer}>
        <MenuOpenIcon />
      </button>

      <Drawer
        anchor={'left'}
        slotProps={{
          paper: {
            className: 'w-[60%]',
          },
        }}
        open={isDrawer}
        onClose={setIsDrawer}
      >
        <SettingsMenu />
      </Drawer>

      <div className="hidden md:block w-[25%]">
        <SettingsMenu />
      </div>

      <div className="w-full md:w-[75%]">
        <Outlet />
      </div>
    </div>
  );
};

const menu = [
  {
    title: 'Account',
    description: 'View and edit your account details',
    path: route.account,
    icon: <AccountCircle />,
  },
  {
    title: 'Change Password',
    description: 'Update your current password securely',
    path: route.changePassword,
    icon: <LockOpen />,
  },
  {
    title: 'Set Target Level',
    description: 'Define your personal training goals',
    path: route.targetLevel,
    icon: <TrackChanges />,
  },
  {
    title: 'Subscription',
    description: 'Manage your subscription and billing details',
    path: route.subscription,
    icon: <Payment />,
  },
];

const SettingsMenu = () => {
  const { pathname } = useLocation();
  const router = useRouter();

  useEffect(() => {
    if (pathname === route.settings) router.push(route.account);
  }, [pathname]);

  return (
    <div className={cn('bg-white h-screen py-2 flex flex-col')}>
      <Typography className="!font-bold !text-xl px-5 py-3 border-b border-gray-300">
        Settings
      </Typography>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn('px-5 py-1 border-b border-gray-300 flex flex-col', {
            'bg-[#F3FCFE]': pathname.includes(item.path),
          })}
        >
          <span className="flex gap-1 font-bold">
            {item.icon}

            <span>{item.title}</span>
          </span>

          <span className="text-gray-400 text-sm">{item.description}</span>
        </Link>
      ))}
    </div>
  );
};
