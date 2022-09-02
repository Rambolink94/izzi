import React from "react";
import { IconButton } from "@mui/material";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";

function ArrowButton({ active, isLeft, onClick }) {
  const arrowButtonStyle = {
    display: active ? "" : "none",
    position: "absolute",
    color: "white",
    top: 0,
    left: isLeft ? 0 : "",
    right: !isLeft ? 0 : "",
    height: "100%",
    borderRadius: 0,
    zIndex: 10,
  };

  const arrowSize = {
    fontSize: 60,
  };

  return (
    <IconButton sx={arrowButtonStyle} onClick={onClick}>
      {isLeft ? <ArrowLeft sx={arrowSize} /> : <ArrowRight sx={arrowSize} />}
    </IconButton>
  );
}

export default ArrowButton;
