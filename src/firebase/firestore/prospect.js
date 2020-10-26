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

/**
 * Retourne la query pour récuperer les prospect
 * @param {*} firestore
 * @param {*} parameter
 */
export function queryGetAll(firestore, parameter) {
  const ref = firestore.collection('prospect');
  const query = ref.orderBy('leadTransmissionDate', 'desc').limit(10);
  return query;
}

/**
 * Récupère le dernier document par uid
 * @param {*} firestore
 * @param {*} uid
 */
export async function getByUid(firestore, id) {
  // eslint-disable-next-line no-useless-catch
  try {
    let prospect = { id: null };
    const prospectRef = firestore.collection('prospect').doc(id);
    const doc = await prospectRef.get();
    if (doc.exists) {
      prospect = {
        ...doc.data(),
      };
    } else {
      console.log('No such document!');
    }
    return prospect;
  } catch (e) {
    throw e;
  }
}
