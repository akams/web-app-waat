import { toast } from 'react-toastify';

/**
 * Creer un document
 * @param {*} firestore
 * @param {*} parameter
 */
export async function create(firestore, parameter) {
  const { company, firstname, lastname, address, phoneNumber, comments, uidCompany } = parameter;
  const ref = firestore.collection('prospects');
  await ref.add({
    uidCompany,
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

const pageSize = 3;
const field = 'leadTransmissionDate';

export async function getAll(firestore, uid) {
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

export async function update(firestore, id, values) {
  const prospectRef = firestore.collection('prospects').doc(id);
  await prospectRef.update(values);
}

/**
 * Retourne la query pour récuperer les prospect
 * @param {*} firestore
 * @param {*} parameter
 */
export function queryGetAllByUidCompany(firestore, userUid) {
  console.log({ userUid });
  const ref = firestore.collection('prospects');
  const query = ref.where('uidCompany', '==', userUid).orderBy('leadTransmissionDate', 'desc').limit(10);

  // db.collection("cities").doc("SF")
  // .onSnapshot(function(doc) {
  //     var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  //     console.log(source, " data: ", doc.data());
  // });

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
