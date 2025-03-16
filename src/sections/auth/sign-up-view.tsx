import { useEffect, useReducer, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  Autocomplete,
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

import { MenuItem } from '@mui/material';

import { IFormAtom, initialFormState, RoleType, useSignupAtom } from 'src/store/jotai/signup';
import { RoleSection } from './_components/RoleSection';
import { MuiStyledPhoneInput } from './_components/PhoneInput';
import { ErrorCaption } from './_components/ErrorCaption';
import clsx from 'clsx';

export function SignUpView() {
  const router = useRouter();

  const [isPassword, setIsPassword] = useReducer((show) => !show, false);
  const [isPassword1, setIsPassword1] = useReducer((show) => !show, false);

  const { formState, setFormState, errorState, setErrorState } = useSignupAtom();

  const handleChange = (key: keyof IFormAtom, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));

    if (key === 'role') {
      setErrorState((prev) => ({
        ...prev,
        gymName: '',
        month: '',
        day: '',
        year: '',
        gender: '',
        childrens: '',
        childrenData: [],
      }));
    }

    setErrorState((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string | Record<string, string>[] | undefined> = {};

    // Common required fields
    const requiredFields: [keyof IFormAtom, string][] = [
      ['firstName', 'First name is required'],
      ['lastName', 'Last name is required'],
      ['password', 'Password is required'],
      ['confirmPassword', 'Confirm password is required'],
      ['role', 'Role is required'],
      ['agreeToTerms', 'You must agree to the terms'],
    ];

    // Role-specific fields using a Record for better type safety
    const roleSpecificFields: Partial<Record<RoleType, [keyof IFormAtom, string][]>> = {
      gym: [['gymName', 'Gym Name is required']],
      coach: [
        ['month', 'Month is required'],
        ['day', 'Day is required'],
        ['year', 'Year is required'],
        ['gender', 'Gender is required'],
      ],
      single_user: [
        ['month', 'Month is required'],
        ['day', 'Day is required'],
        ['year', 'Year is required'],
        ['gender', 'Gender is required'],
      ],
      parent: [['childrens', 'Please specify no. of childrens']],
    };

    if (formState.role && formState.role in roleSpecificFields) {
      requiredFields.push(...(roleSpecificFields[formState.role as RoleType] ?? []));
    }

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

    // ✅ Password match validation
    if (
      formState.password &&
      formState.confirmPassword &&
      formState.password !== formState.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // ✅ Phone number validation
    const phone = formState.phone?.trim();
    if (!phone || phone.length <= 3) newErrors.phone = 'Phone number is required';
    else if (!/^\+\d{4,}$/.test(phone)) newErrors.phone = 'Invalid phone number';

    // ✅ Dynamic Children Validation
    if (formState.role === 'parent') {
      const childErrors: Record<string, string>[] = [];

      formState.childrenData.forEach((child, index) => {
        const childError: Record<string, string> = {};

        if (!child.age) childError.age = `Child ${index + 1} age is required`;
        if (!child.gender) childError.gender = `Child ${index + 1} gender is required`;

        childErrors.push(childError);
      });

      // Add child errors to `newErrors`
      if (childErrors.some((child) => Object.keys(child).length > 0)) {
        newErrors.childrenData = childErrors;
      }
    }

    // ✅ Set error state
    setErrorState(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setFormState(initialFormState);
      router.push('/');
    }
  };

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign up</Typography>
        <Typography variant="body2" color="text.secondary">
          Already have an account?
          <Link to="/sign-in" className="text-[#1877F2] ml-1">
            Login
          </Link>
        </Typography>
      </Box>

      <form className="flex flex-col gap-2" onSubmit={handleSignIn}>
        <div className="flex flex-col md:flex-row gap-2">
          <TextField
            fullWidth
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
            />

            <ErrorCaption caption={errorState.phone} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <FormControl fullWidth variant="outlined">
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

          <FormControl fullWidth variant="outlined">
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

        <RoleSection handleChange={handleChange} />

        <>
          <FormControlLabel
            className="!flex !mr-auto"
            control={
              <Checkbox
                checked={formState.agreeToTerms}
                onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
              />
            }
            label={'I agree to all the Terms and Privacy policies'}
          />

          <ErrorCaption caption={errorState.agreeToTerms} />
        </>

        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
        >
          {isPassword ? (
            <CircularProgress
              className="!text-white group-hover:!text-[#09C0F0]"
              sx={{ scale: '.5' }}
            />
          ) : (
            'Signup'
          )}
        </Button>
      </form>
    </>
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
        // options={monthsData}
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
