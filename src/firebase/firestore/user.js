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
