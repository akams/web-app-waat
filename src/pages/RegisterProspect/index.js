import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../context/firebase';
import RegisterProspectContainer, { initFormData } from '../../containers/RegisterProspect';

function RegisterProspect(props) {
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (data) => {
    console.log('here final submit', { data });
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
