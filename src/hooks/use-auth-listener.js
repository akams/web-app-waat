import { useState, useEffect } from 'react';

export default function useAuthListener(firebase) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  console.log('before 1', { user });
  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((authUser) => {
      console.log('listence 3', { authUser });
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, []);
  return { user };
}
