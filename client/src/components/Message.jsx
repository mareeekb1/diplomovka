import { Box, Typography, useTheme } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";

const Message = ({ id, firstName, lastName, content, picturePath, sendOn }) => {
  const { _id } = useSelector((state) => state.user);
  const isMine = _id === id;
  const { palette } = useTheme();

  const difference = () => {
    const actual = moment();
    const sendedOn = moment(sendOn);
    const difference = actual.diff(sendedOn, "days");
    if (difference < 1) return sendedOn.format("HH:mm");
    if (difference >= 1) return sendedOn.format("DD.MM HH:mm");
  };

  const MessageBuble = () => {
    return (
      <Box
        sx={{
          background: isMine ? palette.primary.dark : palette.neutral.light,
          padding: "0.25rem",
          borderRadius: isMine
            ? "0.5rem 0.5rem 0 0.5rem"
            : "0.5rem 0.5rem 0.5rem 0",
          marginRight: !isMine ? "4rem" : "0",
          marginLeft: isMine ? "4rem" : "0",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}>
          <Typography
            fontWeight="bold"
            fontSize="12px"
            sx={{
              textAlign: isMine ? "end" : "unset",
            }}
          >{`${firstName} ${lastName}`}</Typography>
          <Box sx={{ fontSize: 8, lineHeight: 1.5 }}>{difference()}</Box>
        </Box>
        <Typography sx={{ overflowWrap: "break-word", wordBreak: "break-all" }}>
          {content}
        </Typography>
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
