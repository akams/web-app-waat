import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getByUid } from '../firebase/firestore/user';

export default function useAuthListener(firebase, dispatchSetUsersFunction) {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((val) => {
      setUser(val);
    });

    return () => listener();
  }, []);

  if (user && typeof user === 'object') {
    getByUid(firebase.firestore, user.uid)
      .then((dataUser) => {
        dispatchSetUsersFunction(dataUser.data);
      })
      .catch((error) => {
        console.error({ error });
        toast.error(`Error: ${error}`);
      });
  }

  return { user };
}
