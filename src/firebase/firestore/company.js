/**
 * Creer un document
 * @param {*} firestore
 * @param {*} parameter
 */
export async function create(firestore, parameter) {
  const { uid, name } = parameter;
  const companiesRef = firestore.collection('companies').doc(uid);
  await companiesRef.set(
    {
      name,
    },
    { merge: true }
  );
}

export async function getAllCompanies(firestore) {
  const datas = [];
  const docRef = firestore.collection('companies');
  const querySnapshot = await docRef.get();
  querySnapshot.forEach((doc) => {
    datas.push({ id: doc.id, ...doc.data() });
  });
  return datas;
}
