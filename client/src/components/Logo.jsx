import { Avatar } from "@mui/material";
import React from "react";

import LogoImg from "../assets/logo.png";

function Logo() {
  return (
    <Avatar
      sx={{
        width: { xs: 56, sm: 84 },
        height: { xs: 56, sm: 84 },
      }}
      src={LogoImg}
    />
  );
}

export default Logo;
