import { useState, useRef, useEffect, FC, KeyboardEvent } from 'react';
import { TextField, Box } from '@mui/material';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  value?: string;
}

export const OTPInput: FC<OTPInputProps> = ({ length = 6, onComplete, value = '' }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (value === '') {
      setOtp(new Array(length).fill(''));
      inputsRef.current[0]?.focus();
    }
  }, [value, length]);

  const handleChange = (index: number, newValue: string) => {
    if (!/^\d?$/.test(newValue)) return;

    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);

    if (newValue && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;

    if (e.key === 'Backspace' && !target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
      setTimeout(() => inputsRef.current[index + 1]?.setSelectionRange(1, 1), 0);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
      setTimeout(() => inputsRef.current[index - 1]?.setSelectionRange(1, 1), 0);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => e.target.setSelectionRange(1, 1), 0);
  };

  return (
    <Box display="flex" gap={1} justifyContent="center">
      {otp.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputsRef.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={handleFocus}
          variant="outlined"
          inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: '1.5rem' } }}
          sx={{ width: '16.66%' }}
        />
      ))}
    </Box>
  );
};
