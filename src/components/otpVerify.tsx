import { CircularProgress, Button, Typography } from '@mui/material';
import { OTPInput } from '../components/otpInput';
import { route } from 'src/utils/constants/routes';
import { CardLayout } from 'src/layouts/auth/cardLayout';
import { ResendOtp } from './resendOtp';
import { FormEvent, useCallback, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useOtpResetMutation, useOtpSignupMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'src/slices/apis/types';
import { usePathname, useRouter } from 'src/routes/hooks';
import { decodeQueryParams, encodeQueryParams } from 'src/utils';
import { otpKey } from 'src/utils/constants';
import { HelmetTitle } from './HelmetTitle';

export const OtpVerify = ({ navigatePath }: IOtpVerify) => {
  const location = useLocation();
  const pathname = usePathname();
  const router = useRouter();

  const decodedParams = decodeQueryParams(location.search);

  const [verifySignupOtp, { isLoading }] = useOtpSignupMutation();
  const [verifyResetOtp, { isLoading: isResetting }] = useOtpResetMutation();

  const [otp, setOtp] = useState('');

  const handleOtpComplete = (otp: string) => setOtp(otp);

  const path = encodeQueryParams(navigatePath, { ...decodedParams });

  const handleApiCall = useCallback(
    async (apiCall: (args: { email: string; otp: string }) => Promise<any>) => {
      const { error, data } = await apiCall({ email: decodedParams.email, otp });

      if (error) return toast.error(getErrorMessage(error));
      if (pathname === route.otpReset) sessionStorage.setItem(otpKey, otp);

      toast.success(data.message);
      setOtp('');

      router.push(path);
    },
    [otp, path, pathname, router]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!decodedParams.email) return toast.error('Email is required');
    if (!otp) return toast.error('Otp is required');

    const apiCall = pathname === route.otpReset ? verifyResetOtp : verifySignupOtp;

    await handleApiCall(apiCall);
  };

  return (
    <>
      <HelmetTitle title="Verify OTP" />

      <CardLayout
        title="Verify Code"
        message="We have sent a 6-digit OTP to your registered email address for verification. Please check your inbox and enter the code to complete the process."
        to={route.signIn}
        linkTitle="Login"
      >
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-2">
          <OTPInput length={6} onComplete={handleOtpComplete} value={otp} />

          <Typography variant="body2" color="text.secondary">
            Don’t receive the OTP?
            <ResendOtp email={decodedParams.email} />
          </Typography>

          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            disabled={isLoading || isResetting}
            className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
          >
            {isLoading || isResetting ? (
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
    </>
  );
};

interface IOtpVerify {
  navigatePath: string;
}
