import { styled } from '@mui/material';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export const MuiStyledPhoneInput = styled(PhoneInput)(({ theme }) => ({
  '& input': {
    width: '100%',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 1px ${theme.palette.primary.light}`,
      marginLeft: '2px',
      outline: 'none',
    },
  },

  '& .react-international-phone-input,.react-international-phone-country-selector-button': {
    backgroundColor: 'transparent !important',
    height: '52px !important',
    padding: '10px',
  },
}));
