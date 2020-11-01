import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUser } from '../firebase/firestore/user';

export default function useAuthListener(firebase, dispatchSetUsersFunction) {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((val) => {
      setUser(val);
    });

    return () => listener();
  }, []);

  if (user && typeof user === 'object') {
    getUser(firebase.firestore, user.uid)
      .then((dataUser) => {
        dispatchSetUsersFunction({ uid: user.uid, ...dataUser.data });
      })
      .catch((error) => {
        console.error({ error });
        toast.error(`Error: ${error}`);
      });
  }

  return { user };
}
