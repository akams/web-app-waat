import { mergeArraysByKeyId } from '../../helpers/array';

/**
 * Récupère l'utilisateur par l'uid
 * @param {*} firestore
 */
export async function getUser(firestore, uid) {
  const user = {};
  const userRef = firestore.collection('users').doc(uid);
  const doc = await userRef.get();
  if (doc.exists) {
    user.id = doc.id;
    user.data = doc.data();
  } else {
    console.log('No such document!');
  }
  return user;
}

export async function getAll(firestore) {
  let datas = [];
  const docRef = firestore.collection('users').orderBy('lastname', 'desc');
  const querySnapshot = await docRef.get();
  const users = [];
  querySnapshot.forEach(function (doc) {
    users.push({ id: doc.id, ...doc.data() });
  });

  const collectionCompanies = firestore.collection('companies');
  if (users.length !== 0) {
    const reads = users.map((user) => collectionCompanies.doc(user.id).get());
    const results = await Promise.all(reads);
    const companies = results.map((v) => ({ id: v.id, ...v.data() }));
    const merge = mergeArraysByKeyId(users, companies, 'id');
    datas = merge.map((m) => ({
      ...m,
      company: m.name,
    }));
  }

  console.log('getAll user', { datas });
  return datas;
}
