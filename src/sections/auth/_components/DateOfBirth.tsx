import { useEffect, useMemo } from 'react';
import { Box, TextField, Typography, Autocomplete } from '@mui/material';
import { IErrorAtom, IFormAtom, OptionType, useSignupAtom } from 'src/store/jotai/signup';

export const generateOptions = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => ({
    label: (start + i).toString(),
    value: (start + i).toString(),
  }));

const monthsData: OptionType[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map((month, index) => ({ label: month, value: String(index + 1).padStart(2, '0') }));

export const DateOfBirthInput = ({
  onChange,
}: {
  onChange: <K extends keyof IFormAtom>(key: K, value: IFormAtom[K]) => void;
}) => {
  const currentYear = new Date().getFullYear();
  const yearsData = useMemo(() => generateOptions(1960, currentYear), [currentYear]);

  const { formState, setFormState, errorState } = useSignupAtom();
  const { day: selectedDay, month: selectedMonth, year: selectedYear } = formState;

  const effectiveYear = parseInt(selectedYear?.value || `${currentYear}`, 10);
  const daysInMonth = selectedMonth
    ? new Date(effectiveYear, parseInt(selectedMonth.value, 10), 0).getDate()
    : 31;

  const daysData = useMemo(() => generateOptions(1, daysInMonth), [daysInMonth]);

  useEffect(() => {
    if (selectedDay && parseInt(selectedDay.value, 10) > daysInMonth) {
      setFormState((prev) => ({ ...prev, day: null }));
    }
  }, [selectedMonth, selectedYear, daysInMonth]);

  const renderAutocomplete = (
    label: string,
    options: OptionType[],
    value: OptionType,
    field: keyof IFormAtom & keyof IErrorAtom
  ) => (
    <Box width="100%">
      <Typography variant="body2" gutterBottom className="!mb-2">
        {label}
      </Typography>

      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        value={value}
        onChange={(_, newValue) => onChange(field, newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            fullWidth
            error={!!errorState[field]}
            helperText={typeof errorState[field] === 'string' ? errorState[field] : undefined}
          />
        )}
      />
    </Box>
  );

  return (
    <>
      <Typography variant="subtitle2" gutterBottom className="!text-gray-600 !mb-2">
        What's your date of birth?
      </Typography>

      <Box display="flex" flexDirection="row" sx={{ gap: 2, width: '100%' }}>
        {renderAutocomplete('Month', monthsData, selectedMonth!, 'month')}
        {renderAutocomplete('Day', daysData, selectedDay!, 'day')}
        {renderAutocomplete('Year', yearsData, selectedYear!, 'year')}
      </Box>
    </>
  );
};
