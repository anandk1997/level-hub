import { CircularProgress, Button, Typography, Box } from '@mui/material';
import { OTPInput } from '../components/otpInput';
import { useLocation } from 'react-router-dom';
import { useResendOtpMutation, useVerifyOtpMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { FormEvent, useState, useEffect } from 'react';
import { getErrorMessage } from 'src/slices/apis/types';
import { useRouter } from 'src/routes/hooks';
import { useToastLoading } from 'src/hooks/useToastLoading';
import { route } from 'src/utils/constants/routes';
import { decodeParam } from 'src/utils';
import { CardLayout } from 'src/layouts/auth/cardLayout';

const Otp = () => {
  const location = useLocation();
  const router = useRouter();

  const emailParam = new URLSearchParams(location.search).get('email')!;
  const email = decodeParam(emailParam);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const [otp, setOtp] = useState('');

  const handleOtpComplete = (otp: string) => setOtp(otp);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) return toast.error('Email is required');
    if (!otp) return toast.error('Otp is required');

    const { error, data } = await verifyOtp({ email, otp });

    if (error) return toast.error(getErrorMessage(error));

    toast.success(data.message);
    setOtp('');
    router.push(route.signIn);
  };

  return (
    <CardLayout>
      <Box gap={1.5} display="flex" flexDirection="column" sx={{ mb: 5 }}>
        <Typography variant="h5">Verify OTP</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t receive the OTP?
          <ResendOtp email={email} />
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
    </CardLayout>
  );
};

export default Otp;

const ResendOtp = ({ email }: { email: string }) => {
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const handleResendOtp = async () => {
    if (!email) return toast.error('Email is required');

    const { error, data } = await resendOtp({ email });

    if (error) return toast.error(getErrorMessage(error));

    if (data.success) toast.success('OTP resent successfully');
    setResendTimer(60);
    setIsResendDisabled(true);
  };

  useToastLoading(isResending, 'Resending Otp!');

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  return (
    <Button onClick={handleResendOtp} disabled={isResendDisabled} className="text-[#1877F2] ml-1">
      {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend OTP'}
    </Button>
  );
};
