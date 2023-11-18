import * as React from "react";
import { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { Link, useNavigate } from "react-router-dom";

import { useAdminAuthStore } from "../store/adminAuthStore";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { token, admin, loading, error, logout, checkAuth, isAuth } =
    useAdminAuthStore();

  const drawerWidth = 240;

  const handleLogout = () => {
    logout();
    navigate("/su/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem>
          <ListItemText>Blockvote Dashboard</ListItemText>
        </ListItem>
        <ListItem component={Link} to="/su/status">
          <ListItemIcon>
            <AccessTimeFilledIcon />
          </ListItemIcon>
          <ListItemText>Status</ListItemText>
        </ListItem>
        <ListItem component={Link} to="/su/users">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>Users</ListItemText>
        </ListItem>
        <ListItem component={Link} to="/su/candidates">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText>Candidates</ListItemText>
        </ListItem>
        <ListItem component={Link} to="/su/admins">
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText>Admins</ListItemText>
        </ListItem>
        {isAuth ? (
          <ListItem component={Link} onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        ) : (
          <ListItem component={Link} to="/su/login">
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}
