import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";

// Permissions array to display as checkboxes
const allPermissions = ["Read", "Write", "Delete"];

const RoleManagement = ({ mockApi }) => {
  const [roles, setRoles] = useState(mockApi.getRoles());
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [editingRole, setEditingRole] = useState(null);
  const [errors, setErrors] = useState({ name: "", permissions: "" });

  const handleAddOrEditRole = () => {
    // Validation check
    let validationErrors = { name: "", permissions: "" };

    if (!newRole.name) validationErrors.name = "Role name is required.";
    if (newRole.permissions.length === 0)
      validationErrors.permissions =
        "At least one permission must be selected.";

    setErrors(validationErrors);

    if (validationErrors.name || validationErrors.permissions) return; // Stop if errors exist

    if (editingRole) {
      mockApi.editRole(editingRole.id, newRole);
    } else {
      mockApi.addRole(newRole);
    }

    setRoles(mockApi.getRoles());
    setOpen(false);
    setNewRole({ name: "", permissions: [] });
    setEditingRole(null);
  };

  const handleDeleteRole = (id) => {
    mockApi.deleteRole(id);
    setRoles(mockApi.getRoles());
  };

  const handlePermissionChange = (permission) => {
    setNewRole((prevRole) => {
      const updatedPermissions = prevRole.permissions.includes(permission)
        ? prevRole.permissions.filter((perm) => perm !== permission)
        : [...prevRole.permissions, permission];
      return { ...prevRole, permissions: updatedPermissions };
    });
  };

  return (
    <Box padding={2}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Role
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setEditingRole(role);
                      setNewRole(role);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box padding={4} bgcolor="white" mx="auto" my={10} width="300px">
          {/* Role Name Field */}
          <TextField
            label="Role Name"
            fullWidth
            margin="normal"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />

          {/* Permissions Section */}
          <Box>
            <h3>Permissions</h3>
            {allPermissions.map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={newRole.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    name={permission}
                  />
                }
                label={permission}
              />
            ))}
          </Box>
          {errors.permissions && (
            <FormHelperText error>{errors.permissions}</FormHelperText>
          )}

          <Button variant="contained" onClick={handleAddOrEditRole}>
            {editingRole ? "Edit Role" : "Add Role"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default RoleManagement;
