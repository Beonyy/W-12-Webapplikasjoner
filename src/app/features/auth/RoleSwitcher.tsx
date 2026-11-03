import { useRole, Role } from "./RoleContext";

const Roles: Role[] = ["none", "user", "admin"];

export function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <div style={{ marginBottom: "1rem" }} id="authContainer">
      <span>Velg rolle:</span>
      <span>
        {Roles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={role === r ? "active" : ""}
          >
            {r}
          </button>
        ))}
      </span>
      <span>
        Nåværende rolle: <strong>{role}</strong>
      </span>
    </div>
  );
}