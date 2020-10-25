/* eslint-disable react/no-unused-state */
import React from 'react';
import { NavLink as NavLinkRRD, Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
    };
    // this.activeRoute.bind(this);
  }

  // verifies if routeName is the one active (in browser input)
  // activeRoute(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  // }
  // toggles collapse between opened and closed (true/false)
  // toggleCollapse = () => {
  //   this.setState({
  //     collapseOpen: !this.state.collapseOpen
  //   });
  // };
  // closes the collapse
  // closeCollapse = () => {
  //   this.setState({
  //     collapseOpen: false
  //   });
  // };
  // creates the links that appear in the left menu / Sidebar
  createLinks = (routes) => {
    const {
      location: { pathname },
    } = this.props;
    return routes.map((prop, key) => (
      <NavItem key={key}>
        <NavLink
          to={prop.path}
          tag={NavLinkRRD}
          onClick={this.closeCollapse}
          activeClassName={prop.path === pathname ? 'active' : ''}
        >
          <i className={`${prop.path === pathname ? `${prop.icon} text-primary` : `${prop.icon}`}`} />
          {prop.name}
        </NavLink>
      </NavItem>
    ));
  };

  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link,
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: '_blank',
      };
    }
    return (
      <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
        <Container fluid>
          {/* Navigation */}
          <Nav navbar>{this.createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          <h6 className="navbar-heading text-muted">Documentation</h6>
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default compose(withRouter)(Sidebar);
