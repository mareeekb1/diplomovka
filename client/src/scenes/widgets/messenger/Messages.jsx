import { Box, useTheme } from "@mui/material";
import Message from "components/Message";

const Messages = ({ children, messages }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.background.alt,
        overflow: "auto",
        height: "400px",
        width: "100%",
        padding: "0px 6px 6px 6px ",
      }}
    >
      {!messages.length && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Be the first. Send a messege.
        </Box>
      )}
      {messages.map((item, key) => (
        <Box mt={1} key={key}>
          <Message
            content={item.text}
            firstName={item.senderName}
            lastName={item.senderLastName}
            id={item.senderId}
            sendOn={item.createdAt}
          />
        </Box>
      ))}
      {children}
    </Box>
  );
};
export default Messages;
