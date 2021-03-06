import React, { useRef } from 'react';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import ManageUsersContainer from '../../containers/ManageUsers';

function ManageUsers(props) {
  const { IN_APP_ROUTES } = props;
  const mainContent = useRef(null);
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <div className="main-content" ref={mainContent}>
        <Navbar brandText="Gestion des utilisateurs" />
        <div className="header bg-gradient-green py-7 py-lg-8" />
        <ManageUsersContainer {...props} />
      </div>
    </>
  );
}

export default ManageUsers;
