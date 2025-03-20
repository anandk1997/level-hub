import React, { useState, useRef, useEffect } from 'react';
import { TextField, Box } from '@mui/material';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  value?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete, value = '' }) => {
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

  return (
    <Box display="flex" gap={1} justifyContent="center">
      {otp.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputsRef.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleChange(index, (e.target as HTMLInputElement).value)}
          variant="outlined"
          inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: '1.5rem' } }}
          sx={{ width: 50 }}
        />
      ))}
    </Box>
  );
};
