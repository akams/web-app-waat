import { toast } from 'react-toastify';

/**
 * Creer un document
 * @param {*} firestore
 * @param {*} parameter
 */
export async function create(firestore, parameter) {
  const { company, firstname, lastname, address, phoneNumber, comments } = parameter;
  const ref = firestore.collection('prospects');
  await ref.add({
    company,
    firstname,
    lastname,
    address,
    phoneNumber,
    leadTransmissionDate: new Date(),
    comments,
    abonnement: {},
    infoPrice: {},
    keyDate: {},
  });
}

/**
 * Retourne la query pour récuperer les prospect
 * @param {*} firestore
 * @param {*} parameter
 */
export function queryGetAll(firestore, parameter) {
  const ref = firestore.collection('prospects');
  const query = ref.orderBy('leadTransmissionDate', 'desc').limit(10);
  return query;
}

/**
 * Récupère le dernier document par uid
 * @param {*} firestore
 * @param {*} uid
 */
export async function getByUid(firestore, id) {
  let prospect = {};
  const prospectRef = firestore.collection('prospects').doc(id);
  const doc = await prospectRef.get();
  if (doc.exists) {
    prospect = {
      ...doc.data(),
    };
  } else {
    console.log('No such document!');
  }
  return prospect;
}

export async function deleteDocument(firestore, docId) {
  try {
    const prospectRef = firestore.collection('prospects').doc(docId);
    await prospectRef.delete();
    toast.success('🦄 La suppression a bien été effectuer');
  } catch (error) {
    console.error({ error });
    toast.error(`Error: ${error}`);
  }
}
