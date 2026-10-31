import { RoleProvider, Role } from "@/app/auth/RoleContext";
import { RoleSwitcher } from "@/app/auth/RoleSwitcher";

type AuthLayoutProps = {
  children: React.ReactNode;
  initialRole?: Role;
};

export function AuthLayout({ children, initialRole = "user" }: AuthLayoutProps) {
  return (
    <RoleProvider initialRole={initialRole}>
      <div style={{ padding: "1rem" }}>
        <RoleSwitcher />
        {children}
      </div>
    </RoleProvider>
  );
}