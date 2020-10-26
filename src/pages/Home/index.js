import React, { useRef } from 'react';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import HomeCard from './HomeCard';
import HomeChart from './HomeChart';

function Home(props) {
  const { IN_APP_ROUTES } = props;
  const mainContent = useRef(null);
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <div className="main-content" ref={mainContent}>
        <Navbar brandText="Tableau de bord" />
        <div className="header bg-gradient-green py-7 py-lg-8">
          <HomeCard />
        </div>
        <HomeChart />
      </div>
    </>
  );
}

export default Home;
