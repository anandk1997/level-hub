import { Box } from '@mui/material';
import Navbar10 from './Navbar10';
import NavbarContent10 from './NavbarContent10';

export const Navbar = () => {
  return (
    <Box sx={{ bgcolor: 'white' }}>
      <div className="bg-[#09C0F0] text-center text-sm p-0.5">
        Limited Time Offer: Get 50% Off on All Courses!
      </div>

      <Navbar10>
        <NavbarContent10 navItems={navItems} />
      </Navbar10>
    </Box>
  );
};

export const navItems = [
  { link: 'home', title: 'Home' },
  { link: 'features', title: 'Features' },
  { link: 'reviews', title: 'Reviews' },
  { link: 'about-us', title: 'About Us' },
];
