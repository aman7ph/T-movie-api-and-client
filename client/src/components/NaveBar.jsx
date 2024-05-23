import React from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import StarIcon from "@mui/icons-material/Star";
import { AppBar, Box, Toolbar, styled } from "@mui/material";
import Avater from "./Avater";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "5px 20px",
  backgroundColor: "#1A1A3D",
});
const Icons = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "46px",
  height: "46px",
  borderRadius: "50%",
  opacity: "0.5",
});
function NaveBar() {
  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
      <StyledToolbar>
        <Icons
          sx={{
            opacity: 1,
            "&:hover": {
              opacity: 0.1,
              backgroundColor: "white",
              cursor: "pointer",
            },
          }}
        >
          <LiveTvIcon />
        </Icons>
        <Icons
          sx={{
            opacity: 1,
            "&:hover": {
              opacity: 0.1,
              backgroundColor: "white",
              cursor: "pointer",
            },
          }}
        >
          <StarIcon />
        </Icons>
        <Icons
          sx={{
            opacity: 1,
            "&:hover": {
              opacity: 0.1,
              backgroundColor: "white",
              cursor: "pointer",
            },
          }}
        >
          <WatchLaterIcon />
        </Icons>
        <Avater />
      </StyledToolbar>
    </AppBar>
  );
}

export default NaveBar;
