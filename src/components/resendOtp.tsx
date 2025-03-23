import { Button } from '@mui/material';
import { useResendOtpMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { getErrorMessage } from 'src/slices/apis/types';
import { useToastLoading } from 'src/hooks/useToastLoading';

export const ResendOtp = ({ email }: { email: string }) => {
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
    <Button
      onClick={handleResendOtp}
      disabled={isResendDisabled || isResending}
      className="!text-[#FF991F] ml-1 disabled:!text-gray-400"
    >
      {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend OTP'}
    </Button>
  );
};
