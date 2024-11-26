import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = ({ setActivePage }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          RBAC Dashboard
        </Typography>
        <Button color="inherit" onClick={() => setActivePage("users")}>
          Users
        </Button>
        <Button color="inherit" onClick={() => setActivePage("roles")}>
          Roles
        </Button>
        <Button color="inherit" onClick={() => setActivePage("permissions")}>
          Permissions
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
