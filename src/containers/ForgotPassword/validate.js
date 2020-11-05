export const compileValidation = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Champ obligatoire';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Adresse mail incorrect';
  }
  return errors;
};
