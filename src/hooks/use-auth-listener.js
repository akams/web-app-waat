import { useState, useEffect } from 'react';

export default function useAuthListener(firebase) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((authUser) => {
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
