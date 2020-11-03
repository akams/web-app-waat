export async function getAllCompanies(firestore) {
  const datas = [];
  const docRef = firestore.collection('companies');
  const querySnapshot = await docRef.get();
  querySnapshot.forEach((doc) => {
    datas.push({ id: doc.id, ...doc.data() });
  });
  return datas;
}
