import { Box, Typography } from "@mui/material";
import React from "react";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography>EXPERT</Typography>
      <Box display="flex" gap={1}>
        <Typography variant="h1" color="primary">
          404
        </Typography>
        <Typography variant="h1">Page not found</Typography>
      </Box>
    </Box>
  );
};

export default PageNotFound;
