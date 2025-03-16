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

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    router.push('/');
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField fullWidth name="email" label="Email address" sx={{ mb: 3, ...autofillStyles }} />

      <Link to="/forgot-password" color="inherit" className="mb-1.5 hover:underline">
        Forgot password?
      </Link>

      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

        <OutlinedInput
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
              </IconButton>
            </InputAdornment>
          }
          sx={{ mb: 3, ...autofillStyles }}
        />
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
        onClick={handleSignIn}
        className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
      >
        {showPassword ? (
          <CircularProgress
            className="!text-white group-hover:!text-[#09C0F0]"
            sx={{ scale: '.5' }}
          />
        ) : (
          'Login'
        )}
      </Button>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link to="/sign-up" className="text-[#1877F2] ml-1">
            Get started
          </Link>
        </Typography>
      </Box>

      {renderForm}
    </>
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
