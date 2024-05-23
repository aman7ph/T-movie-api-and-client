import React from "react";
import SideBAr from "./Sidebar";
import Navebar from "./Navebar";
import ExampleWithProvidersPrograms from "./ProgramTable";
import ExampleWithProvidersChannels from "./ChannelsTable";
import Charts from "./Charts";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

function Dashboard() {
  const { component } = useParams();

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Navebar />
      <Box sx={{ display: "flex" }}>
        <SideBAr />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {component === "programs" ? (
            <ExampleWithProvidersPrograms />
          ) : component === "channels" ? (
            <ExampleWithProvidersChannels />
          ) : component === "dashboard" ? (
            <Charts />
          ) : (
            <div>Component not found</div>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
