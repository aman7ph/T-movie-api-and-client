import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";

const StyledTypography = styled(Typography)({
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
});

const StyledBoxChannel = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "7px",
});

const StyledAvatar = styled(Avatar)({
  backgroundColor: "#1A1A3D",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledCircleBox = styled(Box)(({ isActive }) => ({
  display: "flex",
  borderRadius: "50%",
  padding: isActive ? "10px" : "0px",
  border: isActive ? "2px solid #fff" : "none",
  justifyContent: "center",
  alignItems: "center",
  transition: "padding 0.3s, border 0.3s",
}));

function Channels({ item, isActive }) {
  const IconComponent = item.icon;
  return (
    <StyledBoxChannel sx={{ flexDirection: { xs: "column", sm: "row" } }}>
      <StyledCircleBox isActive={isActive}>
        <StyledAvatar
          sx={{ width: { xs: 36, sm: 54 }, height: { xs: 36, sm: 54 } }}
        >
          <IconComponent style={{ backgroundColor: "inherit", fontSize: 20 }} />
        </StyledAvatar>
      </StyledCircleBox>
      <StyledTypography>{item.name}</StyledTypography>
    </StyledBoxChannel>
  );
}

export default Channels;
