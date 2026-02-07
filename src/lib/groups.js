export const ADMIN_GROUPS = ['admin', 'microfix-admin', 'appfix-admin'];
export const PID_GROUPS = ['pid', ...ADMIN_GROUPS];

function normalizeGroups(groups = []) {
  if (!groups) return [];
  const arr = Array.isArray(groups) ? groups : [groups];
  return arr.map((g) => String(g).toLowerCase());
}

export function hasAnyGroup(userGroups = [], required = []) {
  const set = new Set(normalizeGroups(userGroups));
  return required.some((g) => set.has(String(g).toLowerCase()));
}

export function isAdmin(userGroups = []) {
  return hasAnyGroup(userGroups, ADMIN_GROUPS);
}

export function hasPidAccess(userGroups = []) {
  return hasAnyGroup(userGroups, PID_GROUPS);
}
