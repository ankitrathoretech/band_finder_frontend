import React from "react";
import { Box, Chip } from "@mui/material";

function BandItem({ tags }) {
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {tags?.map((tag, index) => (
        <Chip key={index} label={tag.name} color="primary" variant="outlined" />
      ))}
    </Box>
  );
}

export default BandItem;
