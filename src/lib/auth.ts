export type AdminRole =
  | "SUPERADMIN"
  | "ADMIN"
  | "EDITOR"
  | "STORE_MANAGER"
  | "TEAM_MANAGER";

export const ADMIN_ROLES: AdminRole[] = [
  "SUPERADMIN",
  "ADMIN",
  "EDITOR",
  "STORE_MANAGER",
  "TEAM_MANAGER",
];

export function isAdminRole(role: string) {
  return ADMIN_ROLES.includes(role as AdminRole);
}
