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
