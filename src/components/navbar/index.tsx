import { Box } from '@mui/material';
import Navbar10 from './Navbar10';
import NavbarContent10 from './NavbarContent10';
import { INavItem } from './types';

export const Navbar = () => {
  return (
    <Box sx={{ bgcolor: 'white' }}>
      <Navbar10>
        <NavbarContent10 navItems={navItems} />
      </Navbar10>
    </Box>
  );
};

const navItems: INavItem[] = [
  { link: 'home', title: 'Home' },
  { link: 'features', title: 'Features' },
  { link: 'reviews', title: 'Reviews' },
  { link: 'about-us', title: 'About Us' },
];
