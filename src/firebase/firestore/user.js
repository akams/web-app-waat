/**
 * Creer un document
 * @param {*} firestore
 * @param {*} parameter
 */
export async function create(firestore, parameter) {
  const { uid, email, password, lastname, firstname } = parameter;
  const userRef = firestore.collection('users');
  await userRef.add({
    uid,
    email,
    password,
    lastname,
    firstname,
    acl: { admin: true },
  });
}

/**
 * Récupère l'utilisateur par l'uid
 * @param {*} firestore
 */
export async function getByUid(firestore, uid) {
  const user = { id: null };
  const userRef = firestore.collection('users');
  const querySnapshot = await userRef.where('uid', '==', uid).get();

  querySnapshot.forEach(function (doc) {
    user.id = doc.id;
    user.data = doc.data();
  });
  return user;
}
