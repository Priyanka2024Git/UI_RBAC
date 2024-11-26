import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  FormHelperText,
} from "@mui/material";

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState(["Read", "Write", "Delete"]);
  const [newPermission, setNewPermission] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const handleAddPermission = () => {
    if (!newPermission) {
      setError("Permission name is required.");
      return;
    }

    // Check for duplicate permission
    if (permissions.includes(newPermission)) {
      setError("This permission already exists.");
      return;
    }

    setPermissions([...permissions, newPermission]);
    setNewPermission("");
    setDialogOpen(false);
    setError(""); // Reset error message
  };

  const handleDeletePermission = (permission) => {
    setPermissions(permissions.filter((p) => p !== permission));
  };

  return (
    <Box padding={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDialogOpen(true)}
      >
        Add Permission
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Permission</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((permission, index) => (
            <TableRow key={index}>
              <TableCell>{permission}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDeletePermission(permission)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Permission</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Permission Name"
            fullWidth
            value={newPermission}
            onChange={(e) => setNewPermission(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddPermission}
            disabled={!newPermission || error} // Disable if no permission name or if there is an error
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PermissionManagement;
