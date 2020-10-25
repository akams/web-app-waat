import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { toast } from 'react-toastify';
import { withFirebase } from '../../context/firebase';
import RegisterProspectContainer, { initFormData } from '../../containers/RegisterProspect';
import { create as createProspect } from '../../firebase/firestore/prospect';

function RegisterProspect(props) {
  const handleSubmit = async (data) => {
    const { firebase } = props;
    try {
      await createProspect(firebase.firestore, data);
      toast.success('🦄 Wow so easy!');
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };
  const initForm = (data = { company: '', lastname: '', firstname: '', address: '', phoneNumber: '' }) => {
    const { dispatch } = props;
    dispatch(initFormData(data));
  };
  useEffect(() => {
    initForm();
  }, []);
  return (
    <>
      <RegisterProspectContainer originalOnSubmit={handleSubmit} {...props} />
    </>
  );
}

export default compose(withRouter, withFirebase)(RegisterProspect);
