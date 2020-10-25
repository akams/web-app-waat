export const compileValidation = (values) => {
  const errors = {};
  if (!values.company || values.company.trim() === '') {
    errors.company = 'Required';
  }
  if (!values.lastname || values.lastname.trim() === '') {
    errors.lastname = 'Required';
  }
  if (!values.firstname || values.firstname.trim() === '') {
    errors.firstname = 'Required';
  }
  if (!values.address || values.address.trim() === '') {
    errors.address = 'Required';
  }
  if (!values.phoneNumber || values.phoneNumber.trim() === '') {
    errors.phoneNumber = 'Required';
  }
  return errors;
};
