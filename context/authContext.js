"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check for user session on app load
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user); // Set user data from session
      }
    };
    fetchSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
    router.push("/"); // Redirect to home page after login
  };

  const logout = () => {
    setUser(null);
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
