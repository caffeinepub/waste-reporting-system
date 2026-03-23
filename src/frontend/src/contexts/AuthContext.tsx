import { type ReactNode, createContext, useContext, useState } from "react";
import type { User } from "../types";

const SEED_USERS: User[] = [
  {
    id: "admin1",
    name: "Admin",
    email: "admin@eco.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "u1",
    name: "Rajesh Kumar",
    email: "user@eco.com",
    password: "user123",
    role: "user",
  },
];

interface AuthContextValue {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => string | null;
  register: (name: string, email: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(SEED_USERS);

  function login(email: string, password: string): string | null {
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) return "Invalid email or password.";
    setCurrentUser(user);
    return null;
  }

  function register(
    name: string,
    email: string,
    password: string,
  ): string | null {
    if (users.find((u) => u.email === email))
      return "Email already registered.";
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      password,
      role: "user",
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return null;
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, users, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
