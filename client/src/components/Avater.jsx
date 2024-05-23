import { Avatar } from "@mui/material";
import React from "react";

function Avater() {
  return (
    <Avatar
      sx={{ width: { xs: 36, sm: 54 }, height: { xs: 36, sm: 54 } }}
      src="https://images.pexels.com/photos/2815767/pexels-photo-2815767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    />
  );
}

export default Avater;
