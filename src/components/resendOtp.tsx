import { Button } from '@mui/material';
import { useForgotPasswordMutation, useResendOtpMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { useState, useEffect, useCallback } from 'react';
import { getErrorMessage } from 'src/slices/apis/types';
import { useToastLoading } from 'src/hooks/useToastLoading';
import { useLocation } from 'react-router-dom';
import { route } from 'src/utils/constants/routes';

export const ResendOtp = ({ email }: { email: string }) => {
  const { pathname } = useLocation();
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleApiCall = useCallback(async (apiCall: (args: { email: string }) => Promise<any>) => {
    const { error, data } = await apiCall({ email });

    if (error) return toast.error(getErrorMessage(error));
    if (data?.success) toast.success('OTP resent successfully');

    setResendTimer(60);
    setIsResendDisabled(true);
  }, []);

  const handleResendOtp = () => {
    if (!email) return toast.error('Email is required');

    const apiCall = pathname === route.otpReset ? forgotPassword : resendOtp;

    handleApiCall(apiCall);
  };

  useToastLoading(isResending || isLoading, 'Resending OTP!');

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
      disabled={isResendDisabled || isResending || isLoading}
      className="!text-[#FF991F] ml-1 disabled:!text-gray-400"
    >
      {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend OTP'}
    </Button>
  );
};
