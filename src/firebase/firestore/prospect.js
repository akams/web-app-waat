// eslint-disable-next-line no-unused-vars
import { useCollectionData } from 'react-firebase-hooks/firestore';

/**
 * Creer un document
 * @param {*} firestore
 * @param {*} parameter
 */
export async function create(firestore, parameter) {
  const { company, firstname, lastname, address, phoneNumber } = parameter;
  const userRef = firestore.collection('users');
  await userRef.add({
    company,
    firstname,
    lastname,
    address,
    phoneNumber,
  });
}
