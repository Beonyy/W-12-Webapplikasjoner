import { RoleProvider, Role } from "@/app/features/auth/RoleContext";
import { RoleSwitcher } from "@/app/features/auth/RoleSwitcher";

type AuthLayoutProps = {
  children: React.ReactNode;
  initialRole?: Role;
};

export function AuthLayout({ children, initialRole = "user" }: AuthLayoutProps) {
  return (
    <RoleProvider initialRole={initialRole}>
      <div className="authLayout">
        {children}
        <RoleSwitcher />
      </div>
    </RoleProvider>
  );
}