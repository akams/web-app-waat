import React from 'react';
import RegisterProspectContainer from '../../containers/RegisterProspect';

function RegisterProspect() {
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (data) => {
    console.log({ data });
  };

  return (
    <>
      <RegisterProspectContainer />
    </>
  );
}

export default RegisterProspect;
