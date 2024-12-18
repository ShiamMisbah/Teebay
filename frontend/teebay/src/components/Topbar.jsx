import React from 'react'
import { AppBar, Toolbar, Stack, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Topbar = () => {
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("user-details-teebay");
        setAuthUser(null);
    }
    return (
      <AppBar
        position="static"
        sx={{ padding: "0px 50px", marginBottom: "50px" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TEEBAY
          </Typography>
          <Stack direction="row" spacing={2} flexGrow={1}>
            <Button onClick={() => navigate("/")} color="inherit">
              ALL Products
            </Button>
            <Button onClick={() => navigate("/myProduct")} color="inherit">
              My Products
            </Button>
            <Button onClick={() => navigate("/myDashboard")} color="inherit">
              My Dashboard
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    );
}

export default Topbar