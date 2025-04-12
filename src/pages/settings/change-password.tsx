import {
  CircularProgress,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { useChangePasswordMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { FormEvent, useReducer, useState } from 'react';
import { getErrorMessage } from 'src/slices/apis/types';
import { useRouter } from 'src/routes/hooks';
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { autofillStyles } from 'src/sections/auth/sign-up-view';
import { cn } from 'src/utils';
import { ErrorCaption } from 'src/components/ErrorCaption';
import { route } from 'src/utils/constants/routes';
import useFocusInput from 'src/hooks/useFocusInput';
import { otpKey } from 'src/utils/constants';
import { Container } from '@mui/material';

const ChangePassword = () => {
  const router = useRouter();
  const { inputsRef } = useFocusInput();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const initialState = {
    password: '',
    newPassword: '',
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
    if (!formState.newPassword) newErrors.newPassword = 'New Password is required';
    if (!formState.password) newErrors.password = 'Password is required';
    if (!formState.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';

    // ✅ Validate password match
    if (
      formState.newPassword &&
      formState.confirmPassword &&
      formState.newPassword !== formState.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // ✅ Ensure all fields are assigned (fixes TypeScript error)
    setErrorState((prev) => ({
      ...prev,
      newPassword: newErrors.newPassword || '',
      password: newErrors.password || '',
      confirmPassword: newErrors.confirmPassword || '',
    }));

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const { error, data } = await changePassword({
      oldPassword: formState.password!,
      newPassword: formState.newPassword!,
      confirmPassword: formState.confirmPassword,
    });

    if (error) return toast.error(getErrorMessage(error));

    sessionStorage.removeItem(otpKey);

    toast.success(data.message);
    router.push(route.welcomeBack);
  };

  return (
    <Container>
      <Box
        sx={{
          py: 5,
          px: 3,
          width: 1,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          height: '80vh',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-xl">Change Password</h1>
          <Typography className="text-gray-500 !mb-4">
            Your previous password has been reseted. Please set a new password for your account.
          </Typography>

          <FormControl fullWidth variant="outlined" className="!mt-2">
            <InputLabel
              className={cn({ '!text-red-500': errorState.password })}
              htmlFor="outlined-adornment-password"
            >
              Enter Old Password
            </InputLabel>

            <OutlinedInput
              fullWidth
              name="password"
              label="Old Password"
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

          <FormControl fullWidth variant="outlined" className="!my-2">
            <InputLabel
              className={cn({ '!text-red-500': errorState.newPassword })}
              htmlFor="outlined-adornment-newPassword"
            >
              Enter New Password
            </InputLabel>

            <OutlinedInput
              fullWidth
              name="newPassword"
              label="New Password"
              type={isPassword ? 'text' : 'newPassword'}
              inputRef={(el) => (inputsRef.current = el)}
              error={!!errorState.newPassword}
              value={formState.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={setIsPassword} edge="end">
                    <Iconify icon={isPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                  </IconButton>
                </InputAdornment>
              }
              sx={{ ...autofillStyles }}
            />

            {!errorState.newPassword && (
              <Typography variant="caption" className={cn('!ms-2 !mt-0.5')}>
                Use 8 or more characters with a mix of letters, numbers & symbols
              </Typography>
            )}

            <ErrorCaption caption={errorState.newPassword} />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel
              className={cn({ '!text-red-500': errorState.confirmPassword })}
              htmlFor="outlined-adornment-confirm-password"
            >
              Confirm New Password
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

            {!errorState.confirmPassword && (
              <Typography variant="caption" className={cn('!ms-2 !mt-0.5')}>
                Use 8 or more characters with a mix of letters, numbers & symbols
              </Typography>
            )}

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
      </Box>
    </Container>
  );
};

export default ChangePassword;
