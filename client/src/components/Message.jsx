import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";

const Message = ({ id, firstName, lastName, content, picturePath }) => {
  const { _id } = useSelector((state) => state.user);
  const isMine = _id === id;
  const { palette } = useTheme();

  const MessageBuble = () => {
    return (
      <Box
        sx={{
          background: isMine ? palette.primary.dark : palette.neutral.light,
          padding: "0.25rem",
          borderRadius: isMine
            ? "0.5rem 0.5rem 0 0.5rem"
            : "0.5rem 0.5rem 0.5rem 0",
          marginRight: !isMine ? "5rem" : "0",
          marginLeft: isMine ? "5rem" : "0",
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="12px"
          sx={{
            textAlign: isMine ? "end" : "unset",
          }}
        >{`${firstName} ${lastName}`}</Typography>
        <Typography>{content}</Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      {isMine && (
        <FlexBetween sx={{ width: "100%" }}>
          <Box />
          <MessageBuble />
        </FlexBetween>
      )}
      {!isMine && (
        <FlexBetween sx={{ width: "100%" }}>
          <MessageBuble />
          <Box />
        </FlexBetween>
      )}
    </Box>
  );
};

export default Message;
