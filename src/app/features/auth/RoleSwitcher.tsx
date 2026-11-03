import { useRole, Role } from "./RoleContext";

const Roles: Role[] = ["none", "user", "admin"];

export function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <span style={{ marginRight: "0.5rem" }}>Velg rolle:</span>
      {Roles.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => setRole(r)}
          style={{
            marginRight: "0.5rem",
            padding: "0.3rem 0.7rem",
            borderRadius: "4px",
            border: role === r ? "2px solid #333" : "1px solid #ccc",
            background: role === r ? "#eee" : "#fff",
            cursor: "pointer",
          }}
        >
          {r}
        </button>
      ))}
      <span style={{ marginLeft: "0.5rem", fontStyle: "italic" }}>
        Nåværende: <strong>{role}</strong>
      </span>
    </div>
  );
}