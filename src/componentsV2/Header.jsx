import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const [userInitials, setUserInitials] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const nameParts = user.username.split(" ");
      let initials = "";
      for (let i = 0; i < nameParts.length; i++) {
        if (i > 1) break;

        initials += nameParts[i].charAt(0);
      }
      setUserInitials(initials.toUpperCase());
    }
  }, []);

  return <Box sx={{ height: 100, position: "sticky" }}></Box>;
}

export default Header;
