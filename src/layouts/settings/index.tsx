import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
import { cn } from 'src/utils';
import { route } from 'src/utils/constants/routes';

export const SettingsLayout = () => {
  const { pathname } = useLocation();
  const router = useRouter();

  useEffect(() => {
    if (pathname === route.settings) router.push(route.account);
  }, [pathname]);

  return (
    <div className="flex">
      <div className="bg-white h-screen py-2 flex flex-col w-[25%]">
        <Typography className="!font-bold !text-xl px-5 py-3 border-b border-gray-300">
          Settings
        </Typography>

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn('px-5 py-1 border-b border-gray-300', {
              'bg-[#F3FCFE]': pathname.includes(item.path),
            })}
          >
            {item.title}
          </Link>
        ))}
      </div>

      <div className="w-[75%]">
        <Outlet />
      </div>
    </div>
  );
};

const menu = [
  {
    title: 'Account',
    description: '',
    path: route.account,
    icon: '',
  },
  {
    title: 'Change Password',
    description: '',
    path: route.changePassword,
    icon: '',
  },
  {
    title: 'Set Target Level',
    description: '',
    path: route.targetLevel,
    icon: '',
  },
];
