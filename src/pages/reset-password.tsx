import { CircularProgress, Button, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useResetPasswordMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { FormEvent, useReducer, useState } from 'react';
import { getErrorMessage } from 'src/slices/apis/types';
import { useRouter } from 'src/routes/hooks';
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { autofillStyles } from 'src/sections/auth/sign-up-view';
import { cn, decodeQueryParams } from 'src/utils';
import { ErrorCaption } from 'src/components/ErrorCaption';
import { route } from 'src/utils/constants/routes';
import { CardLayout } from 'src/layouts/auth/cardLayout';
import useFocusInput from 'src/hooks/useFocusInput';
import { otpKey } from 'src/utils/constants';
import { HelmetTitle } from 'src/components/HelmetTitle';

const ResetPassword = () => {
  const location = useLocation();
  const router = useRouter();
  const { inputsRef } = useFocusInput();

  const decodedParams = decodeQueryParams(location.search);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const initialState = {
    otp: '',
    password: '',
    confirmPassword: '',
  };

  const [formState, setFormState] = useState(initialState);
  const [errorState, setErrorState] = useState(initialState);

  const [isPassword, setIsPassword] = useReducer((show) => !show, false);
  const [isPassword1, setIsPassword1] = useReducer((show) => !show, false);

  const handleChange = (key: string, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));

    setErrorState((prev) => ({ ...prev, [key]: '' }));
  };

  const otp = sessionStorage.getItem(otpKey);

  const validate = () => {
    const newErrors: Partial<typeof initialState> = {};

    // ✅ Validate required fields
    if (!otp) {
      toast.error('OTP is required');
      newErrors.otp = 'OTP is required';
    }
    if (!formState.password) newErrors.password = 'Password is required';
    if (!formState.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';

    // ✅ Validate password match
    if (
      formState.password &&
      formState.confirmPassword &&
      formState.password !== formState.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // ✅ Email validation
    const emailValue = decodedParams?.email?.trim();
    if (!emailValue) {
      toast.error('Email is required');
      return false;
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
      toast.error('Invalid email address');
      return false;
    }

    // ✅ Ensure all fields are assigned (fixes TypeScript error)
    setErrorState((prev) => ({
      ...prev,
      otp: newErrors.otp || '',
      password: newErrors.password || '',
      confirmPassword: newErrors.confirmPassword || '',
    }));

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const { error, data } = await resetPassword({
      email: decodedParams.email,
      otp: otp!,
      password: formState.password,
    });

    if (error) return toast.error(getErrorMessage(error));

    sessionStorage.removeItem(otpKey);

    toast.success(data.message);
    router.push(route.welcomeBack);
  };

  return (
    <>
      <HelmetTitle title="Reset Password" />

      <CardLayout
        title="Reset Password"
        message="Your previous password has been reseted. Please set a new password for your account."
        to={route.signIn}
        linkTitle="Login"
      >
        <form noValidate onSubmit={handleSubmit}>
          <FormControl fullWidth required variant="outlined" className="!my-2">
            <InputLabel
              className={cn({ '!text-red-500': errorState.password })}
              htmlFor="outlined-adornment-password"
            >
              New Password
            </InputLabel>

            <OutlinedInput
              fullWidth
              name="password"
              label="New Password"
              type={isPassword ? 'text' : 'password'}
              inputRef={(el) => (inputsRef.current = el)}
              error={!!errorState.password}
              value={formState.password}
              onChange={(e) => handleChange('password', e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={setIsPassword} edge="end">
                    <Iconify icon={isPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                  </IconButton>
                </InputAdornment>
              }
              sx={{ ...autofillStyles }}
            />

            <ErrorCaption caption={errorState.password} />
          </FormControl>

          <FormControl fullWidth required variant="outlined">
            <InputLabel
              className={cn({ '!text-red-500': errorState.confirmPassword })}
              htmlFor="outlined-adornment-confirm-password"
            >
              Confirm Password
            </InputLabel>

            <OutlinedInput
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={isPassword1 ? 'text' : 'password'}
              value={formState.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              error={!!errorState.confirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={setIsPassword1} edge="end">
                    <Iconify icon={isPassword1 ? 'tabler:eye' : 'tabler:eye-off'} />
                  </IconButton>
                </InputAdornment>
              }
              sx={{ ...autofillStyles }}
            />

            <ErrorCaption caption={errorState.confirmPassword} />
          </FormControl>

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
              'Submit'
            )}
          </Button>
        </form>
      </CardLayout>
    </>
  );
};

export default ResetPassword;
