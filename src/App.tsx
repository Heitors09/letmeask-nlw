import { Outlet } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

type AuthContextType = {
  user: User | undefined;
  authGoogle: () => Promise<void>;
};

type User = {
  id: string;
  name: string | null;
  avatar: string | null;
};

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function authGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, authGoogle }}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export default App;
