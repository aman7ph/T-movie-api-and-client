import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledCard = styled(({ isActive, ...other }) => <Card {...other} />)(
  ({ theme, isActive }) => ({
    minWidth: "150px",
    margin: isActive ? "8px" : "6px",
    padding: "2px",
    border: "none",
    backgroundColor: "#0e0f2b",
    transform: isActive ? "scale(1.1)" : "none",
    transition: "transform 0.3s",
    position: "relative",

    "&::before, &::after": {
      content: "''",
      position: "absolute",
      width: "70px",
      height: "70px",
      border: "solid white",
      borderWidth: "1px 1px 0 0",
      display: isActive ? "block" : "none",
    },
    "&::before": {
      right: "5px",
      top: "5px",
    },
    "&::after": {
      borderWidth: "0 0 1px 1px",
      bottom: "5px",
      left: "5px",
    },
  })
);
const StyledGlowingBox = styled(({ isActive, ...other }) => <Box {...other} />)(
  ({ theme, isActive }) => ({
    width: "70px",
    height: "30px",
    backgroundColor: "#fff",
    display: isActive ? "block" : "none",
    position: "absolute",
    boxShadow: "0px -43px 47px 0px #fff",
    bottom: "-20px",
    right: "calc(50% - 35px)",
  })
);

const StyledCardContent = styled(CardContent)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "5px 20px",
  backgroundColor: "#1A1A3D",
  borderRadius: "8px",
});

const StyledBoxIcon = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5px",
  width: "100%",
  height: "70px",
  borderRadius: "5px",
});

const StyledTypography = styled(Typography)({
  margin: "5px",
  width: "100%",
  backgroundColor: "#1A1A3D",
  color: "#fff",
});

function Cards({ item, isActive }) {
  return (
    <StyledCard isActive={isActive}>
      <StyledGlowingBox isActive={isActive} />
      <StyledCardContent>
        <StyledBoxIcon>
          <item.icon style={{ fontSize: 40, color: "white" }} />
        </StyledBoxIcon>
        <StyledTypography variant="h6">{item.name}</StyledTypography>
        <StyledTypography variant="body2">{item.description}</StyledTypography>
      </StyledCardContent>
    </StyledCard>
  );
}

export default Cards;
