// @vitest-environment happy-dom

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RoleProvider } from "@/app/auth/RoleContext";
import { RoleSwitcher } from "@/app/auth/RoleSwitcher";

function renderWithRoleProvider(ui: React.ReactNode) {
  return render(<RoleProvider>{ui}</RoleProvider>);
}

describe("RoleSwitcher", () => {
  it("viser alle roller og oppdaterer valgt rolle ved klikk", async () => {
    const user = userEvent.setup();

    renderWithRoleProvider(<RoleSwitcher />);

    const noneBtn = screen.getByRole("button", { name: "none" });
    const userBtn = screen.getByRole("button", { name: "user" });
    const adminBtn = screen.getByRole("button", { name: "admin" });

    expect(noneBtn).toBeInTheDocument();
    expect(userBtn).toBeInTheDocument();
    expect(adminBtn).toBeInTheDocument();

    // Default er initialRole i RoleProvider (hos deg: "none" eller "user" avhengig av hva du satte)
    expect(screen.getByText(/Nåværende:/)).toHaveTextContent("user");

    await user.click(noneBtn);
    expect(screen.getByText(/Nåværende:/)).toHaveTextContent("none");

    await user.click(adminBtn);
    expect(screen.getByText(/Nåværende:/)).toHaveTextContent("admin");
  });
});