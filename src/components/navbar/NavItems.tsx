import { List, ListItemButton, ListItemText } from '@mui/material';

export function NavMenu({ navItems }: any) {
  return navItems.map((item: any, index: any) => (
    <a key={index} href={`#${item.title}`} className="p-2">
      {item.title}
    </a>
  ));
}

function MenuDrawer({ item }: any) {
  return (
    <ListItemButton>
      <ListItemText primary={item.title} />
    </ListItemButton>
  );
}
export function NavMenuDrawer({ navItems, menuTextColor }: any) {
  return (
    <List>
      {navItems?.map((item: any, index: any) => (
        <MenuDrawer key={index} {...{ item, menuTextColor }} />
      ))}
    </List>
  );
}
