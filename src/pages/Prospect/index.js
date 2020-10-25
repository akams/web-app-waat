import React, { useRef } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import ProspectContainer from '../../containers/Prospect';

function Prospect(props) {
  const { IN_APP_ROUTES } = props;
  const mainContent = useRef(null);
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <div className="main-content" ref={mainContent}>
        <Navbar brandText="Home" />
        <div className="header bg-gradient-green py-7 py-lg-8" />
        {/* Page content */}
        <ProspectContainer />
      </div>
    </>
  );
}

export default Prospect;
