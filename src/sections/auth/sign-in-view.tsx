import { useState } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Button, CircularProgress, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { Link } from 'react-router-dom';
import { useSigninMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'src/slices/apis/types';
import { useSigninAtom } from 'src/store/jotai/signin';
import { ErrorCaption } from '../../components/ErrorCaption';
import Cookies from 'js-cookie';
import { route } from 'src/utils/constants/routes';
import { CardLayout } from 'src/layouts/auth/cardLayout';
import { tokenKey } from 'src/utils/constants';

export function SignInView() {
  const router = useRouter();

  const { formState, errorState, handleChange, validate } = useSigninAtom();

  const [signin, { isLoading }] = useSigninMutation();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const { error, data } = await signin(formState);

      if (error) return toast.error(getErrorMessage(error));

      Cookies.set(tokenKey, data.resultData.token, { expires: 1 });
      router.push(route.dashboard);
    }
  };

  return (
    <CardLayout
      title="Login"
      message="Login to access your account"
      to={route.signUp}
      linkTitle="Signup"
    >
      <form noValidate onSubmit={handleSignIn}>
        <TextField
          fullWidth
          required
          name="email"
          label="Email address"
          error={!!errorState.email}
          helperText={errorState.email}
          value={formState.email}
          onChange={(e) => handleChange('email', e.target.value)}
          sx={{ mb: 3, ...autofillStyles }}
        />

        <FormControl fullWidth required variant="outlined">
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

        <Link
          to={route.forgot}
          color="inherit"
          className="mb-1.5 flex justify-end hover:underline text-[#FF991F] text-sm"
        >
          Forgot password?
        </Link>

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
