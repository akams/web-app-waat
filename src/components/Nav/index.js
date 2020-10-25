import React from 'react';
import {
  Nav as NavComponent,
  NavMenu as NavMenuComponent,
  NavItem as NavItemComponent,
  NavLinks as NavLinksComponent,
  NavSimpleLinks as NavSimpleLinksComponent,
  NavBtn as NavBtnComponent,
  NavBtnLink as NavBtnLinkComponent,
} from './styles/Nav';

export default function Nav({ children, ...restProps }) {
  return <NavComponent {...restProps}>{children}</NavComponent>;
}

Nav.Menu = function NavMenu({ children, ...restProps }) {
  return <NavMenuComponent {...restProps}>{children}</NavMenuComponent>;
};

Nav.Item = function NavItem({ children, ...restProps }) {
  return <NavItemComponent {...restProps}>{children}</NavItemComponent>;
};

Nav.Links = function NavLinks({ children, ...restProps }) {
  return <NavLinksComponent {...restProps}>{children}</NavLinksComponent>;
};

Nav.SimpleLinks = function NavSimpleLinks({ children, ...restProps }) {
  return <NavSimpleLinksComponent {...restProps}>{children}</NavSimpleLinksComponent>;
};

Nav.Btn = function NavBtn({ children, ...restProps }) {
  return <NavBtnComponent {...restProps}>{children}</NavBtnComponent>;
};

Nav.BtnLink = function NavBtnLink({ children, ...restProps }) {
  return <NavBtnLinkComponent {...restProps}>{children}</NavBtnLinkComponent>;
};
