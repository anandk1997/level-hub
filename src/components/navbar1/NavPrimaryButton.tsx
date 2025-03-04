import PropTypes from 'prop-types';
// @next


// @mui
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

/***************************  NAVBAR - PRIMARY BUTTON  ***************************/

export default function NavPrimaryButton({ sx, children, ...rest }:any) {
  return (
    <Button
      variant="contained"
      size="small"
      sx={sx}
      {...rest}
      {...(rest?.href && { component: Link })}
      rel="noopener noreferrer"
      aria-label="nav-primary-btn"
    >
      {children || 'Primary Button'}
    </Button>
  );
}

NavPrimaryButton.propTypes = { sx: PropTypes.any, children: PropTypes.any, rest: PropTypes.any };
