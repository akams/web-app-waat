/**
 *
 * @param {*} values
 */
export default function mainInfo(values) {
  const errors = {};
  if (!values.lastname || values.lastname.trim() === '') {
    errors.lastname = 'Champ obligatoire';
  }
  if (!values.firstname || values.firstname.trim() === '') {
    errors.firstname = 'Champ obligatoire';
  }
  if (!values.address || values.address.trim() === '') {
    errors.address = 'Champ obligatoire';
  }
  if (!values.comments || values.comments.trim() === '') {
    errors.comments = 'Champ obligatoire';
  }
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Adresse mail incorrect';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Champ obligatoire';
  } else if (!/^(01|06|07)[0-9]{8}$/i.test(values.phoneNumber)) {
    errors.phoneNumber = 'Numéro de téléphone incorrect';
  }
  return errors;
}
