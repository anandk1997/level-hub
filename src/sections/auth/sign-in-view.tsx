import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { Link } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import { useSigninMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'src/slices/apis/types';
import { IFormAtom, useSigninAtom } from 'src/store/jotai/signin';
import { ErrorCaption } from './_components/ErrorCaption';
import Cookies from 'js-cookie';
import { route } from 'src/utils/constants/routes';
import { CardLayout } from 'src/layouts/auth/cardLayout';

export function SignInView() {
  const router = useRouter();

  const { formState, setFormState, errorState, setErrorState } = useSigninAtom();

  const [signin, { isLoading }] = useSigninMutation();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: keyof IFormAtom, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));

    setErrorState((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string | Record<string, string>[] | undefined> = {};

    // Common required fields
    const requiredFields: [keyof IFormAtom, string][] = [
      ['email', 'Email is required'],
      ['password', 'Password is required'],
    ];

    // ✅ Validate required fields
    requiredFields.forEach(([key, message]) => {
      if (!formState[key]) newErrors[key] = message;
    });

    // ✅ Email validation
    const email = formState.email?.trim();
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // ✅ Set error state
    setErrorState(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const { error, data } = await signin(formState);

      if (error) return toast.error(getErrorMessage(error));

      Cookies.set('token', data.resultData.token, { expires: 7 });
      router.push(route.index);
    }
  };

  return (
    <CardLayout>
      <Box gap={1.5} display="flex" flexDirection="column" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link to={route.signUp} className="text-[#1877F2] ml-1">
            Get started
          </Link>
        </Typography>
      </Box>

      <form onSubmit={handleSignIn}>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <TextField
            fullWidth
            name="email"
            label="Email address"
            error={!!errorState.email}
            helperText={errorState.email}
            value={formState.email}
            onChange={(e) => handleChange('email', e.target.value)}
            sx={{ mb: 3, ...autofillStyles }}
          />

          <Link to={route.forgot} color="inherit" className="mb-1.5 hover:underline">
            Forgot password?
          </Link>

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

            <OutlinedInput
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              error={!!errorState.password}
              value={formState.password}
              onChange={(e) => handleChange('password', e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                  </IconButton>
                </InputAdornment>
              }
              sx={{ mb: 3, ...autofillStyles }}
            />

            <ErrorCaption caption={errorState.password} />
          </FormControl>

          <FormControlLabel
            className="!flex !mr-auto !mb-2"
            control={<Checkbox />}
            label={'Remember me'}
          />

          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            disabled={isLoading}
            className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
          >
            {isLoading ? (
              <CircularProgress
                className="!text-white group-hover:!text-[#09C0F0]"
                sx={{ scale: '.5' }}
              />
            ) : (
              'Login'
            )}
          </Button>
        </Box>
      </form>
    </CardLayout>
  );
}

const autofillStyles = {
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px #f4f4f4 inset',
    WebkitTextFillColor: '#000',
    borderRadius: '4px',
  },
  '& input:-webkit-autofill:focus': {
    WebkitBoxShadow: '0 0 0 1000px #e0e0e0 inset',
    WebkitTextFillColor: '#000',
  },
};
