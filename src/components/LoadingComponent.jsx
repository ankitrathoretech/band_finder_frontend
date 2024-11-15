import { Box, Typography } from "@mui/material";
import React from "react";

function LoadingComponent({ text }) {
  return (
    <Box sx={{ textAlign: "center", padding: 2 }}>
      <Typography
        variant="h6"
        component="p"
        sx={{ fontWeight: "bold", fontStyle: "italic" }}
      >
        {text}{" "}
      </Typography>
    </Box>
  );
}

export default LoadingComponent;
