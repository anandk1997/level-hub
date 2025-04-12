import { List } from '@mui/material';
import { route } from 'src/utils/constants/routes';
import { INavItem, INavitemProps } from './types';
import { useRouter } from 'src/routes/hooks';

export function NavMenu({ navItems, onClose }: INavitemProps & { onClose?: () => void }) {
  const router = useRouter();

  return navItems.map((item: INavItem, index: number) => (
    <a
      key={index}
      onClick={() => {
        router.push(route.dashboard);
        if (onClose) onClose();
      }}
      href={`#${item.link}`}
      className="p-2"
    >
      {item.title}
    </a>
  ));
}

export function NavMenuDrawer({ navItems, onClose }: INavitemProps & { onClose?: () => void }) {
  return (
    <List className="flex flex-col">
      <NavMenu navItems={navItems} onClose={onClose} />
    </List>
  );
}
