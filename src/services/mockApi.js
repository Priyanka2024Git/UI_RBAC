const users = [
  { id: 1, name: "Alice", role: "Admin", status: "Active" },
  { id: 2, name: "Bob", role: "User", status: "Inactive" },
];

const roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "User", permissions: ["Read"] },
];

const permissions = ["Read", "Write", "Delete"];

export const mockApi = {
  // User Management
  getUsers: () => [...users],

  // Add user with the assigned role and status
  addUser: (user) => users.push({ id: Date.now(), ...user }),

  // Delete a user by id
  deleteUser: (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) users.splice(index, 1);
  },

  // Edit an existing user (name, role, status)
  editUser: (id, updatedUser) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
    }
  },

  // Role Management
  getRoles: () => [...roles],

  // Add new role with specific permissions
  addRole: (role) => roles.push({ id: Date.now(), ...role }),

  // Delete a role by id
  deleteRole: (id) => {
    const index = roles.findIndex((role) => role.id === id);
    if (index !== -1) roles.splice(index, 1);
  },

  // Edit a role and modify its permissions
  editRole: (id, updatedRole) => {
    const index = roles.findIndex((role) => role.id === id);
    if (index !== -1) {
      roles[index] = { ...roles[index], ...updatedRole };
    }
  },

  // Permissions
  getPermissions: () => [...permissions],

  // Assign a permission to a role
  assignPermissionToRole: (roleId, permission) => {
    const role = roles.find((role) => role.id === roleId);
    if (role && !role.permissions.includes(permission)) {
      role.permissions.push(permission);
    }
  },

  // Remove a permission from a role
  removePermissionFromRole: (roleId, permission) => {
    const role = roles.find((role) => role.id === roleId);
    if (role) {
      role.permissions = role.permissions.filter((perm) => perm !== permission);
    }
  },

  // Assign a role to a user
  assignRoleToUser: (userId, roleId) => {
    const user = users.find((user) => user.id === userId);
    const role = roles.find((role) => role.id === roleId);
    if (user && role) {
      user.role = role.name; // Update user role
    }
  },

  // Get the roles and permissions assigned to a user
  getUserRolePermissions: (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      const role = roles.find((role) => role.name === user.role);
      return role ? role.permissions : [];
    }
    return [];
  },

  // Update user status (Active/Inactive)
  updateUserStatus: (id, status) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      user.status = status;
    }
  },
};
