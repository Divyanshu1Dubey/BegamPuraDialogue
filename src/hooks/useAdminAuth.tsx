"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";

type AdminAuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

const ADMIN_PASSWORD = "brhf@2026";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("brhf-admin-auth");
    if (stored === "true") setIsAuthenticated(true);
  }, []);

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("brhf-admin-auth", "true");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("brhf-admin-auth");
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
