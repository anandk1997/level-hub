import { Button } from '@mui/material';
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { cn } from 'src/utils';
import { route } from 'src/utils/constants/routes';

const Users = () => {
  return (
    <>
      <div className="flex justify-between gap-1 mb-2">
        <div>
          <Typography variant="h4">Users</Typography>
          <p className="text-gray-500 text-sm">This month you completed 200 Activities and 800XP</p>
        </div>

        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
        >
          Create Invitation
        </Button>
      </div>

      {Array.from({ length: 20 }, (_, i) => (
        <Card className="my-1 p-2 flex gap-1 justify-between items-center" key={i}>
          <span>30 March 2025</span>
          <span>4 Activities</span>
          <span>500XP</span>

          <Link
            to={route.reports}
            className={cn(
              'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 text-white disabled:!text-white disabled:cursor-none !max-w-fit',
              '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]'
            )}
          >
            View
          </Link>
        </Card>
      ))}
    </>
  );
};

export default Users;
