import React from 'react';
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

import './index.scss';

function Footer() {
  return (
    <footer className="spe-footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{' '}
            <a className="font-weight-bold ml-1" href="https://waat.fr/" rel="noopener noreferrer" target="_blank">
              Waat Solution
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                About Us
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
