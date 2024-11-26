import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionManagement from "./components/PermissionManagement";
import { mockApi } from "./services/mockApi";

const App = () => {
  const [activePage, setActivePage] = useState("users");

  const renderPage = () => {
    switch (activePage) {
      case "users":
        return <UserManagement mockApi={mockApi} />;
      case "roles":
        return <RoleManagement mockApi={mockApi} />;
      case "permissions":
        return <PermissionManagement />;
      default:
        return null;
    }
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Navbar setActivePage={setActivePage} />
      {renderPage()}
    </ThemeProvider>
  );
};

export default App;
