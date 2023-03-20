import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import React, { useState } from "react";

const ChatContainerInput = ({ sendMessage }) => {
  const [toSendMessage, setToSendMessage] = useState("");
  function fullSend() {
    sendMessage(toSendMessage);
    setToSendMessage("");
  }
  return (
    <TextField
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.shiftKey) {
          return setToSendMessage(toSendMessage + "\n");
        }
        if (e.key === "Enter" && !e.shiftKey) {
          return fullSend();
        }
      }}
      sx={{
        position: "sticky",
        borderTop: "1px solid",
        padding: "4px 4px",
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={() => fullSend()}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      variant="standard"
      value={toSendMessage}
      onChange={({ target: { value } }) => setToSendMessage(value)}
      fullWidth
      multiline={Boolean(toSendMessage.includes("\n"))}
      maxRows={8}
    />
  );
};

export default ChatContainerInput;
