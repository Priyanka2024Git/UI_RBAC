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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormHelperText,
} from "@mui/material";

const UserManagement = ({ mockApi }) => {
  const [users, setUsers] = useState(mockApi.getUsers());
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    role: "",
    status: "Active",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [errors, setErrors] = useState({ name: "", role: "" });

  const handleAddOrEditUser = () => {
    // Validation check
    let validationErrors = { name: "", role: "" };
    if (!newUser.name) validationErrors.name = "Name is required.";
    if (!newUser.role) validationErrors.role = "Role is required.";

    setErrors(validationErrors);

    if (validationErrors.name || validationErrors.role) return; // Stop if errors exist

    if (editingUser) {
      mockApi.editUser(editingUser.id, newUser);
    } else {
      mockApi.addUser(newUser);
    }
    setUsers(mockApi.getUsers());
    setOpen(false);
    setNewUser({ name: "", role: "", status: "Active" });
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    mockApi.deleteUser(id);
    setUsers(mockApi.getUsers());
  };

  return (
    <Box padding={2}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.status === "Active"}
                    onChange={() =>
                      mockApi.editUser(user.id, {
                        ...user,
                        status:
                          user.status === "Active" ? "Inactive" : "Active",
                      }) || setUsers(mockApi.getUsers())
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setEditingUser(user);
                      setNewUser(user);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
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
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />

          {/* Role Dropdown */}
          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              {mockApi.getRoles().map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
            {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
          </FormControl>

          {/* Status Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleAddOrEditUser}>
            {editingUser ? "Edit" : "Add"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserManagement;
