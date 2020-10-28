import { useState, useEffect } from 'react';

export default function useAuthListener(firebase) {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((val) => {
      setUser(val);
    });

    return () => listener();
  }, []);
  return { user };
}
