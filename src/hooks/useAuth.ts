import { useState, useCallback } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

const STORAGE_KEY = "tracker_user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((email: string, _password: string) => {
    const u: User = { id: crypto.randomUUID(), email, name: email.split("@")[0] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
    return true;
  }, []);

  const register = useCallback((email: string, _password: string, name: string) => {
    const u: User = { id: crypto.randomUUID(), email, name };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, login, register, logout };
}
