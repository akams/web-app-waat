// eslint-disable-next-line no-unused-vars
import { useCollectionData } from 'react-firebase-hooks/firestore';

/**
 * Creer un document
 * @param {*} firestore
 * @param {*} parameter
 */
export async function create(firestore, parameter) {
  const { company, firstname, lastname, address, phoneNumber } = parameter;
  const ref = firestore.collection('prospect');
  await ref.add({
    company,
    firstname,
    lastname,
    address,
    phoneNumber,
    leadTransmissionDate: new Date(),
  });
}

export function queryGetAll(firestore, parameter) {
  const ref = firestore.collection('prospect');
  const query = ref.orderBy('leadTransmissionDate', 'desc').limit(10);
  return query;
}
