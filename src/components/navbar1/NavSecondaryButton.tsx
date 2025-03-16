import PropTypes from 'prop-types';
// @next

// @mui
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

/***************************  NAVBAR - SECONDARY BUTTON  ***************************/

export default function NavSecondaryButton({ sx, children, ...rest }: any) {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={sx}
      {...rest}
      {...(rest?.href && { component: Link })}
      rel="noopener noreferrer"
      aria-label="nav-secondary-btn"
    >
      {children || 'Secondary Button'}
    </Button>
  );
}

NavSecondaryButton.propTypes = { sx: PropTypes.any, children: PropTypes.any, rest: PropTypes.any };
