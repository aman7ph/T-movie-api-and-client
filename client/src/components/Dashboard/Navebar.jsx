import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { Notifications } from "@mui/icons-material";
import Logo from "../Logo";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "0 !important",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

function Navebar() {
  const [open, setOpen] = useState(false);
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#0e0f2b",
        boxShadow: "0px 12px 5px 0px rgba(0,0,0,0.18)",
      }}
    >
      <StyledToolbar>
        <Box
          sx={{
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            width: "20%",
          }}
        >
          <Logo />
          <Typography variant="h4" sx={{ color: "#000" }}>
            T-Movie
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "15px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Dashboard
          </Typography>

          <Icons>
            <Badge color="error">
              <Notifications />
            </Badge>
            <Avatar
              onClick={(e) => setOpen(true)}
              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </Icons>
        </Box>

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navebar;
