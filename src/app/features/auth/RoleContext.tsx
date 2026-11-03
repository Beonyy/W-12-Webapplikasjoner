import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "none" | "user" | "admin";

type RoleContextValue = {
  role: Role;
  setRole: (role: Role) => void;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

type RoleProviderProps = {
  children: ReactNode;
  initialRole?: Role; // <- ny prop
};

export function RoleProvider({ children, initialRole = "user" }: RoleProviderProps) {
  const [role, setRole] = useState<Role>(initialRole);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return ctx;
}