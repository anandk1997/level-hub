import { atom, useAtom } from 'jotai';

const anchorAtom = atom(null);

export const useNavbarAtom = () => {
  const [anchorEl, setAnchorEl] = useAtom(anchorAtom);

  return {
    anchorEl,
    setAnchorEl,
  };
};
