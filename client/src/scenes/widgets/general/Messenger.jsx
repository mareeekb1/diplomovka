import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const Wrapper = styled(Box)(({ theme }) => ({
  padding: "0.5rem 1rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.25rem",
  boxShadow: "2px 2px 4px -4px black",
  position: "absolute",
  bottom: 4,
  right: 4,
}));

const Messenger = () => {
  return <Wrapper>messenger</Wrapper>;
};

export default Messenger;
