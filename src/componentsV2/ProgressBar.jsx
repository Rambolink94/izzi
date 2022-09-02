import React from "react";
import { Paper } from "@mui/material";

function ProgressBar({ timeElapsed, runtime }) {
  const progressStyle = {
    height: "100%",
    width: `${timeElapsed ? Math.round((timeElapsed / runtime) * 100) : 0}%`,
    backgroundColor: "red",
    borderRadius: 0,
  };

  return (
    <Paper
      sx={{
        position: "absolute",
        bottom: 0,
        height: 5,
        width: "100%",
        borderRadius: 0,
        display: timeElapsed ? "" : "none",
      }}
    >
      <Paper sx={progressStyle} />
    </Paper>
  );
}

export default ProgressBar;
