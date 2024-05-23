import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { ViewCarousel } from "@mui/icons-material";
function VerticalMenu() {
  return (
    <ViewCarousel>
      <Paper>
        <Typography>First Item</Typography>
        <Button variant="outlined">Click me please!</Button>
      </Paper>
      <Paper>
        <Typography>Second Item</Typography>
        <Button variant="outlined">Click me please!</Button>
      </Paper>
      <Paper>
        <Typography>Third Item</Typography>
        <Button variant="outlined">Click me please!</Button>
      </Paper>
    </ViewCarousel>
  );
}

export default VerticalMenu;
