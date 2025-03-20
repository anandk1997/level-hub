import { CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/material';
import { OTPInput } from '../components/otpInput';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useVerifyOtpMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import { getErrorMessage } from 'src/slices/apis/types';
import { useRouter } from 'src/routes/hooks';

const Otp = () => {
  const location = useLocation();
  const router = useRouter();

  const email = new URLSearchParams(location.search).get('email');

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const [otp, setOtp] = useState('');

  const handleOtpComplete = (otp: string) => setOtp(otp);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) return toast.error('Email is required');
    if (!otp) return toast.error('Otp is required');

    const { error, data } = await verifyOtp({ email, otp });

    if (error) return toast.error(getErrorMessage(error));

    toast.error(data.message);
    setOtp('');

    router.push('/sign-in');
  };

  return (
    <Container sx={{ m: 5 }}>
      <Box
        sx={{
          py: 5,
          px: 3,
          width: 1,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          margin: 'auto',
          maxWidth: 'var(--layout-auth-content-width)',
        }}
      >
        <Box gap={1.5} display="flex" flexDirection="column" sx={{ mb: 5 }}>
          <Typography variant="h5">Verify OTP</Typography>
          <Typography variant="body2" color="text.secondary">
            Don’t recieved the otp?
            <Button className="text-[#1877F2] ml-1">Resend OTP</Button>
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <OTPInput length={6} onComplete={handleOtpComplete} value={otp} />

          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            disabled={isLoading}
            className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] !mt-4"
          >
            {isLoading ? (
              <CircularProgress
                className="!text-white group-hover:!text-[#09C0F0]"
                sx={{ scale: '.5' }}
              />
            ) : (
              'Verify'
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Otp;
