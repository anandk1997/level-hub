import { useEffect, useId, useReducer, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { Checkbox } from '@mui/material';

import { MenuItem } from '@mui/material';

import { initialFormState, useSignupAtom } from 'src/store/jotai/signup';
import { RoleSection } from './_components/RoleSection';
import { MuiStyledPhoneInput } from './_components/PhoneInput';
import { ErrorCaption } from '../../components/ErrorCaption';
import clsx from 'clsx';
import { useSignupMutation } from 'src/slices/apis/app.api';
import { getErrorMessage } from 'src/slices/apis/types';
import toast from 'react-hot-toast';
import { route } from 'src/utils/constants/routes';
import { CardLayout } from 'src/layouts/auth/cardLayout';
import { cn, encodeQueryParams, filterValues } from 'src/utils';

import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RadioGroup } from '@mui/material';
import { Dayjs } from 'dayjs';

export function SignUpView() {
  const router = useRouter();
  const genderId = useId();

  const [isPassword, setIsPassword] = useReducer((show) => !show, false);
  const [isPassword1, setIsPassword1] = useReducer((show) => !show, false);

  const { formState, setFormState, errorState, handleChange, validate } = useSignupAtom();

  const [signup, { isLoading }] = useSignupMutation();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = formState.dob!?.toDate().toISOString().split('T')[0];

    if (validate()) {
      const payload = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
        gender: formState.gender,
        dob: formattedDate,
        phone: formState.phone,
        type: formState.role,
      };

      const filteredFormState: any = filterValues(payload);

      const { error } = await signup(filteredFormState);

      if (error) return toast.error(getErrorMessage(error));

      setFormState(initialFormState);

      const path = encodeQueryParams(route.otpSignup, { email: formState.email });

      router.push(path);
    }
  };

  const dobProps: Partial<DatePickerProps<any>> = {
    label: 'Select Date of Birth (Optional)',
    value: formState.dob,
    onChange: (newValue: Dayjs) => handleChange('dob', newValue),
    slotProps: {
      textField: {
        error: !!errorState.dob,
        helperText: errorState.dob,
      },
    },
  };

  return (
    <CardLayout
      title="Create an account"
      message="Let’s get you all set up so you can access your personal account."
      to={route.signIn}
      linkTitle="Login"
    >
      <form noValidate className="flex flex-col gap-2" onSubmit={handleSignIn}>
        <div className="flex flex-col md:flex-row gap-2">
          <TextField
            fullWidth
            required
            error={!!errorState.firstName}
            helperText={errorState.firstName}
            name="firstName"
            label="First Name"
            value={formState.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            sx={{ ...autofillStyles }}
          />

          <TextField
            fullWidth
            required
            error={!!errorState.lastName}
            helperText={errorState.lastName}
            name="lastName"
            label="Last Name"
            value={formState.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            sx={{ ...autofillStyles }}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <TextField
            fullWidth
            required
            error={!!errorState.email}
            helperText={errorState.email}
            name="email"
            label="Email address"
            value={formState.email}
            onChange={(e) => handleChange('email', e.target.value)}
            sx={{ ...autofillStyles }}
          />

          <div className="w-full flex flex-col">
            <MuiStyledPhoneInput
              className="z-10 w-full bg-transparent"
              defaultCountry="in"
              value={formState.phone}
              onChange={(phone) => handleChange('phone', phone)}
              sx={{
                '& .react-international-phone-input': {
                  borderTop: !!errorState.phone ? '1px solid red !important' : '',
                  borderRight: !!errorState.phone ? '1px solid red !important' : '',
                  borderBottom: !!errorState.phone ? '1px solid red !important' : '',
                  color: !!errorState.phone ? 'red !important' : '',
                },

                '& .react-international-phone-country-selector-button': {
                  borderTop: !!errorState.phone ? '1px solid red !important' : '',
                  borderLeft: !!errorState.phone ? '1px solid red !important' : '',
                  borderBottom: !!errorState.phone ? '1px solid red !important' : '',
                },
              }}
            />

            <ErrorCaption caption={errorState.phone} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <FormControl fullWidth required variant="outlined">
            <InputLabel
              className={clsx({ '!text-red-500': errorState.password })}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>

            <OutlinedInput
              fullWidth
              name="password"
              label="Create Password"
              type={isPassword ? 'text' : 'password'}
              value={formState.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={!!errorState.password}
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
              className={clsx({ '!text-red-500': errorState.confirmPassword })}
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
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className="!hidden md:!flex" {...dobProps} />
              <MobileDatePicker className={clsx('md:!hidden !flex')} {...dobProps} />
            </LocalizationProvider>
          </div>

          <FormControl sx={{ flex: 1 }}>
            <FormLabel id={genderId} className="!text-sm !font-bold">
              What's your gender? (Optional)
            </FormLabel>

            <RadioGroup
              row
              aria-labelledby={genderId}
              name="row-radio-buttons-group"
              value={formState.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>

            <ErrorCaption caption={errorState.gender} />
          </FormControl>
        </div>

        <RoleSection handleChange={handleChange} />

        <>
          <FormControlLabel
            className={cn('!flex !mr-auto', {
              '-mb-3': errorState.agreeToTerms,
            })}
            control={
              <Checkbox
                checked={formState.agreeToTerms}
                onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
              />
            }
            label={'I agree to all the Terms and Privacy policies'}
          />

          <ErrorCaption caption={errorState.agreeToTerms} className="!ms-3" />
        </>

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
            'Signup'
          )}
        </Button>
      </form>
    </CardLayout>
  );
}

export const autofillStyles = {
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

export const PhoneInputss = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryChange = (_: any, newValue: any) => {
    setSelectedCountry(newValue);
  };

  const handlePhoneNumberChange = (event: any) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <div>
      <Autocomplete
        options={[]}
        getOptionLabel={(option: any) => option.label}
        value={selectedCountry}
        onChange={handleCountryChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Country"
            variant="outlined"
            placeholder="Country"
            fullWidth
          />
        )}
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        variant="outlined"
        placeholder="Enter Phone Number"
        fullWidth
        style={{ marginTop: '16px' }} // Add some spacing
      />
    </div>
  );
};

export function DOBDropDown() {
  const monthsData = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  // Generate years from 1900 to current year.
  const currentYear = new Date().getFullYear();
  const yearsData = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (1900 + i).toString());

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Use currentYear if no year is selected.
  const effectiveYear = year ? parseInt(year, 10) : currentYear;

  // When a month is selected, calculate its days using effectiveYear.
  // If no month is selected, default to 31 days.
  const daysInMonth = month ? new Date(effectiveYear, parseInt(month, 10), 0).getDate() : 31;
  const daysData = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Reset the day if the current selection exceeds the new max.
  useEffect(() => {
    if (day && parseInt(day, 10) > daysInMonth) {
      setDay('');
    }
  }, [month, year, day, daysInMonth]);

  return (
    <Box display="flex" flexDirection="row" sx={{ gap: 2, width: '100%' }}>
      <TextField
        select
        label="Day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        variant="outlined"
        fullWidth
      >
        {daysData.map((d) => (
          <MenuItem key={d} value={d}>
            {d}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        variant="outlined"
        fullWidth
      >
        {monthsData.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        variant="outlined"
        fullWidth
      >
        {yearsData.map((yr) => (
          <MenuItem key={yr} value={yr}>
            {yr}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
