import {
  CircularProgress,
  Button,
  Typography,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { OTPInput } from '../components/otpInput';
import { Link, useLocation } from 'react-router-dom';
import { useResetPasswordMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { FormEvent, useReducer, useState } from 'react';
import { getErrorMessage } from 'src/slices/apis/types';
import { useRouter } from 'src/routes/hooks';
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { autofillStyles } from 'src/sections/auth/sign-up-view';
import { cn, decodeParam } from 'src/utils';
import { ErrorCaption } from 'src/sections/auth/_components/ErrorCaption';
import { route } from 'src/utils/constants/routes';
import { CardLayout } from 'src/layouts/auth/cardLayout';

const ResetPassword = () => {
  const location = useLocation();
  const router = useRouter();

  const emailParam = new URLSearchParams(location.search).get('email')!;
  const email = decodeParam(emailParam);

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

  const validate = () => {
    const newErrors: Partial<typeof initialState> = {};

    // ✅ Validate required fields
    if (!formState.otp) newErrors.otp = 'OTP is required';
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
    const emailValue = email?.trim();
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
      email,
      otp: formState.otp,
      password: formState.password,
    });

    if (error) return toast.error(getErrorMessage(error));

    toast.success(data.message);
    router.push(route.signIn);
  };

  return (
    <CardLayout>
      <Box gap={1.5} display="flex" flexDirection="column" sx={{ mb: 5 }}>
        <Typography variant="h5">Reset Password</Typography>
        <Typography variant="body2" color="text.secondary">
          Back to Login?
          <Link to={route.signIn} className="text-[#1877F2] ml-1">
            Login
          </Link>
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <OTPInput length={6} onComplete={(otp) => handleChange('otp', otp)} value={formState.otp} />

        <FormControl fullWidth variant="outlined" className="!my-2">
          <InputLabel
            className={cn({ '!text-red-500': errorState.password })}
            htmlFor="outlined-adornment-password"
          >
            Password
          </InputLabel>

          <OutlinedInput
            fullWidth
            name="password"
            label="Password"
            type={isPassword ? 'text' : 'password'}
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

        <FormControl fullWidth variant="outlined">
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
  );
};

export default ResetPassword;
