import { toast } from 'react-toastify';
import { getStatusWorksheet, getPercentageCompletion } from '../../containers/Prospect/Edit/control-data';

/**
 * Creer un document
 * @param {*} firestore
 * @param {*} parameter
 */
export async function create(firestore, parameter) {
  const { firstname, lastname, address, phoneNumber, comments, uidCompany } = parameter;
  const mainInfo = {
    uidCompany,
    firstname,
    lastname,
    address,
    phoneNumber,
    leadTransmissionDate: new Date(),
    comments,
  };
  const ref = firestore.collection('prospects');
  await ref.add({
    uidCompany,
    firstname,
    lastname,
    address,
    phoneNumber,
    leadTransmissionDate: new Date(),
    comments,
    abonnement: {},
    infoPrice: {},
    keyDate: {},
    statusWorksheet: {
      percentageCompletion:
        getPercentageCompletion(mainInfo) +
        getPercentageCompletion({}) +
        getPercentageCompletion({}) +
        getPercentageCompletion({}),
      status: getStatusWorksheet({
        mainInfo,
        abonnement: {},
        infoPrice: {},
        keyDate: {},
      }),
    },
  });
}

export async function getAll(firestore, uid) {
  const datas = [];
  const docRef = firestore
    .collection('prospects')
    .where('uidCompany', '==', uid)
    .orderBy('leadTransmissionDate', 'desc');

  const querySnapshot = await docRef.get();
  querySnapshot.forEach(function (doc) {
    datas.push({ id: doc.id, ...doc.data() });
  });
  return datas;
}

const pageSize = 10;
const field = 'leadTransmissionDate';

export async function getDataByPagination(firestore, uid) {
  const datas = [];
  const docRef = firestore
    .collection('prospects')
    .where('uidCompany', '==', uid)
    .orderBy('leadTransmissionDate', 'desc')
    .limit(pageSize);

  const querySnapshot = await docRef.get();
  querySnapshot.forEach(function (doc) {
    datas.push({ id: doc.id, ...doc.data() });
  });
  return datas;
}

export async function nextPage(firestore, uid, last) {
  const datas = [];
  const docRef = firestore
    .collection('prospects')
    .where('uidCompany', '==', uid)
    .orderBy('leadTransmissionDate', 'desc')
    .startAfter(last[field])
    .limit(pageSize);

  const querySnapshot = await docRef.get();
  querySnapshot.forEach((doc) => {
    datas.push({ id: doc.id, ...doc.data() });
  });
  return datas;
}

export async function prevPage(firestore, uid, first) {
  const datas = [];
  const docRef = firestore
    .collection('prospects')
    .where('uidCompany', '==', uid)
    .orderBy('leadTransmissionDate', 'desc')
    .endBefore(first[field])
    .limitToLast(pageSize);

  const querySnapshot = await docRef.get();
  querySnapshot.forEach((doc) => {
    datas.push({ id: doc.id, ...doc.data() });
  });
  return datas;
}

/**
 * Retourne la query pour récuperer les prospect
 * @param {*} firestore
 * @param {*} parameter
 */
export function queryGetAllByUidCompany(firestore, userUid) {
  const ref = firestore.collection('prospects');
  const query = ref.where('uidCompany', '==', userUid).orderBy('leadTransmissionDate', 'desc').limit(10);
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
