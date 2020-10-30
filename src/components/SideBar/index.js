/* eslint-disable react/no-unused-state */
import React, { useState } from 'react';
import { NavLink as NavLinkRRD, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { checkAuthorizationWithRoutes } from '../../services/auth.service';
import { SideMenuUl as SideMenuUlComponent, SideMenuItemLi as SideMenuItemLiComponent } from './styles';

function Sidebar(props) {
  const { user, routes } = props;
  const [collapseOpen, setToggleCollapse] = useState(false);

  const closeCollapse = () => {
    setToggleCollapse(false);
  };

  /**
   * Create links aside navigation
   * @param {*} roads
   */
  const createLinks = (roads) => {
    const {
      location: { pathname },
    } = props;
    console.log({ user });
    return roads.map((prop, key) => {
      if (checkAuthorizationWithRoutes(user, pathname)) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName={prop.path === pathname ? 'active' : ''}
            >
              <i className={`${prop.path === pathname ? `${prop.icon} text-primary` : `${prop.icon}`}`} />
              {prop.name}
            </NavLink>
            {/* <div style={{ display: !collapseOpen ? 'block' : 'none' }}>
          <Sidebar.Ul>
            <Sidebar.Li>Page 1</Sidebar.Li>
            <Sidebar.Li>Page 2</Sidebar.Li>
          </Sidebar.Ul>
        </div> */}
          </NavItem>
        );
      }
      return null;
    });
  };

  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
      <Container fluid>
        {/* Toggler */}
        <button className="navbar-toggler" type="button" onClick={setToggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        <NavbarBrand className="pt-0">
          <img
            title="La Recharge Responsable"
            alt="La Recharge Responsable"
            className="navbar-brand-img"
            src="https://waat.fr/wp-content/uploads/2018/05/logo-waat-v10-rvb.svg"
          />
        </NavbarBrand>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <img
                  title="La Recharge Responsable"
                  alt="La Recharge Responsable"
                  className="navbar-brand-img"
                  src="https://waat.fr/wp-content/uploads/2018/05/logo-waat-v10-rvb.svg"
                />
              </Col>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={closeCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          <h6 className="navbar-heading text-muted">Documentation</h6>
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="#">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

Sidebar.Ul = function SideMenuUl({ children, ...restProps }) {
  return <SideMenuUlComponent {...restProps}>{children}</SideMenuUlComponent>;
};
Sidebar.Li = function SideMenuItemLi({ children, ...restProps }) {
  return <SideMenuItemLiComponent {...restProps}>{children}</SideMenuItemLiComponent>;
};

const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Sidebar);
