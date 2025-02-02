import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth();

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  return { user, loading };
}
