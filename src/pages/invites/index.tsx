import { Button } from '@mui/material';
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { route } from 'src/utils/constants/routes';

const Invites = () => {
  return (
    <>
      <div className="flex justify-between gap-1 mb-2">
        <Typography variant="h4">Invitations</Typography>

        <Button
          to={route.createInvite}
          component={Link}
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
          <span>Adam Smith</span>
          <span>demo@gmail.com</span>
          <span className="text-[#09C0F0]">Single User</span>
          <span>24 April 2025 User</span>
          {i === 3 ? (
            <span className="text-[#09C0F0]">Pending</span>
          ) : (
            <span className="text-[#498478]">Accepted</span>
          )}

          <Button variant="contained" color="error" sx={{ borderRadius: 4, textTransform: 'none' }}>
            Cancel
          </Button>
        </Card>
      ))}
    </>
  );
};

export default Invites;
