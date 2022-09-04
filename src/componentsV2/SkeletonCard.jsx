import React from "react";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";

function SkeletonCard() {
  return (
    <Box sx={{ width: 180 }}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={118}
        sx={{ bgcolor: "grey.900" }}
      />
      <Skeleton sx={{ bgcolor: "grey.900" }} />
      <Skeleton width="60%" sx={{ bgcolor: "grey.900" }} />
    </Box>
  );
}

export default SkeletonCard;
