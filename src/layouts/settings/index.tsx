import { Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { route } from 'src/utils/constants/routes';

export const SettingsLayout = () => {
  return (
    <div className="flex">
      <div className="bg-white h-screen py-2 flex flex-col w-[25%]">
        <Typography className="!font-bold !text-xl px-5 py-3 border-b border-gray-300">
          Settings
        </Typography>

        <Link to={route.account} className="px-5 py-1 border-b border-gray-300">
          Account
        </Link>
        <Link to={route.changePassword} className="px-5 py-1 border-b border-gray-300">
          Change Password
        </Link>
        <Link to={route.targetLevel} className="px-5 py-1 border-b border-gray-300">
          Set Target Level
        </Link>
      </div>
      <div className="w-[75%]">
        <Outlet />
      </div>
    </div>
  );
};
