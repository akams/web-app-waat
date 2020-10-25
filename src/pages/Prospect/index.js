import React, { useState, useRef } from 'react';
import { Container, Row } from 'reactstrap';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

function Prospect(props) {
  const { IN_APP_ROUTES } = props;
  const [isOpen, setIsOpen] = useState(false);
  const mainContent = useRef(null);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <div className="main-content" ref={mainContent}>
        <Navbar brandText="Home" />
        <div style={{ padding: '20%' }}>
          <h1>Gestion des prospects page</h1>
        </div>
      </div>
    </>
  );
}

export default Prospect;
