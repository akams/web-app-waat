import React, { useRef } from 'react';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

function Home(props) {
  const { IN_APP_ROUTES } = props;
  const mainContent = useRef(null);
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <div className="main-content" ref={mainContent}>
        <Navbar brandText="Home" />
        <div style={{ padding: '20%' }}>
          <h1>Dashboard page</h1>
        </div>
      </div>
    </>
  );
}

export default Home;
