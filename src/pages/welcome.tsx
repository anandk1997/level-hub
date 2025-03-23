import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CardLayout } from 'src/layouts/auth/cardLayout';
import { route } from 'src/utils/constants/routes';

const Welcome = () => {
  return (
    <CardLayout title="" message="" to={route.signIn} linkTitle="Login">
      <div className="flex justify-between mb-4 -mt-2">
        <div className="">
          <Typography variant="h5">Congratulations</Typography>

          <Typography variant="body2" color="text.secondary">
            Your account created successfully.
          </Typography>
        </div>

        <img src="/assets/icons/congratulations.png" alt="" className="h-5" />
      </div>

      <Link
        to={route.signIn}
        className=" flex justify-center items-center rounded-lg p-3 font-bold text-white group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
      >
        Back to Login
      </Link>
    </CardLayout>
  );
};

export default Welcome;
