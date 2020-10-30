import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import { withFirebase } from '../../context/firebase';
import RegisterProspectContainer, { initFormData } from '../../containers/RegisterProspect';
import { create as createProspect } from '../../firebase/firestore/prospect';

function RegisterProspect(props) {
  const { IN_APP_ROUTES } = props;
  const mainContent = useRef(null);

  const handleSubmit = async (data) => {
    const { firebase } = props;
    try {
      await createProspect(firebase.firestore, data);
      toast.success('🦄 Fiche travaux créer avec succès!');
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };
  const initForm = (
    data = { company: '', lastname: '', firstname: '', address: '', phoneNumber: '', comments: '' }
  ) => {
    const { dispatch } = props;
    dispatch(initFormData(data));
  };
  useEffect(() => {
    initForm();
  }, []);
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <div className="main-content" ref={mainContent}>
        <Navbar brandText="Gestion des prospect" />
        <div className="header bg-gradient-green py-7 py-lg-8" />
        <RegisterProspectContainer originalOnSubmit={handleSubmit} {...props} />
      </div>
    </>
  );
}

export default compose(withRouter, withFirebase)(RegisterProspect);
