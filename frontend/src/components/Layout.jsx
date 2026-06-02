import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

import { Outlet } from "react-router-dom";

import { Link } from "react-router-dom";

import Navbar from "./Navbar";

const drawerWidth = 220;

export default function Layout() {

  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex" }}>

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

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
              >
                <ListItemText
                  primary="Dashboard"
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/products"
              >
                <ListItemText
                  primary="Products"
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/customers"
              >
                <ListItemText
                  primary="Customers"
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/orders"
              >
                <ListItemText
                  primary="Orders"
                />
              </ListItemButton>
            </ListItem>

          </List>

        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: "220px",
          }}
        >
          <Outlet />
        </Box>

      </Box>
    </>
  );
}