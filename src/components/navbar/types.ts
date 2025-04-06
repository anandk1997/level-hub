export type INavLink = 'home' | 'features' | 'reviews' | 'about-us';

export interface INavItem {
  link: INavLink;
  title: string;
}

export interface INavitemProps {
  navItems: INavItem[];
}
