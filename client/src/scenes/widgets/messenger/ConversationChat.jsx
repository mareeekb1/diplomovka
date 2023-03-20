import { Box, Typography, useTheme } from "@mui/material";
import { getRequest, postRequest } from "api";
import { api } from "api/routes";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Remove as RemoveIcon } from "@mui/icons-material";
import io from "socket.io-client";
import MessageInput from "./MessageInput";
import Message from "components/Message";
const WIDGET_WIDTH = 250;

const ConversationChat = ({ index, updateConversation, ...props }) => {
  const { open, _id, members } = props;

  const theme = useTheme();
  const user = useSelector((state) => state.user);

  const scrollRef = useRef();
  const [openedRef, setOpenedRef] = useState(scrollRef);
  const [friendReceiver, setFriendReceiver] = useState(null);
  const [messages, setMessages] = useState([]);

  const SOCKET_SERVER_URL = "http://localhost:3002";
  const [socket, setSocket] = useState(null);

  // Connect to the socket server on component mount
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socket.emit("join", user._id);
    setSocket(socket);

    // Disconnect from socket server on component unmount
    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, [user._id]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (mess) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...mess, isReceived: true },
      ]);
    });
    if (openedRef.current) {
      openedRef.current.scrollIntoView();
    }

    return () => {
      socket.off("getMessage");
    };
  }, [openedRef, socket]);

  useEffect(() => {
    async function getUserName() {
      const friend = members.find((item) => item !== user._id);

      const request = await getRequest(api.users.getUserById(friend));
      if (request) setFriendReceiver(request);
    }
    async function getMessages() {
      const request = await getRequest(api.conversation.get(_id));
      if (request) setMessages(request.messages);
    }
    if (!friendReceiver) {
      getUserName();
    }
    getMessages();
  }, [_id, friendReceiver, members, user._id]);

  function handleOpenChat() {
    updateConversation(_id, "open", true);
    setOpenedRef(scrollRef);
    seeNewMessage();
  }
  function handleCloseChat() {
    updateConversation(_id, "open", false);
    setOpenedRef({ current: null, ...openedRef });
  }
  function seeNewMessage() {
    setMessages(messages.map(({ isReceived, ...rest }) => rest));
  }

  async function sendMessage(text) {
    const request = await postRequest(api.messages.send, {
      text: text,
      conversationId: _id,
      senderId: user._id,
      senderName: user.firstName,
      senderLastName: user.lastName,
    });
    if (request) {
      socket.emit("sendMessage", {
        senderId: socket.id,
        receiverId: friendReceiver._id,
        ...request,
      });
      setMessages([...messages, request]);
      openedRef.current.scrollIntoView();
    }
  }

  useEffect(() => {
    if (openedRef.current && open) {
      openedRef.current.scrollIntoView();
    }
  }, [open, openedRef, messages]);

  const USER_NAME = friendReceiver
    ? `${friendReceiver.firstName} ${friendReceiver.lastName}`
    : "...";
  const newMessages = messages.filter((item) => item.isReceived).length;
  const isNewMessage = newMessages > 0;
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 4,
        right: index * WIDGET_WIDTH + 4 + 200 + 5 * (index + 1),
        zIndex: 100,
        width: WIDGET_WIDTH,
      }}
    >
      <Box
        gap={1}
        display="flex"
        justifyContent="space-between"
        sx={{
          background: isNewMessage
            ? theme.palette.primary.main
            : theme.palette.background.alt,
          borderRadius: "0.25rem",
          border: "1px solid",
          borderColor: theme.palette.neutral.main,
        }}
      >
        {open ? (
          <Box sx={{ overflow: "auto", width: "100%" }}>
            <Box
              onClick={handleCloseChat}
              sx={{
                padding: "0.5rem 1rem",
                display: "flex",
                justifyContent: "space-between",

                borderRadius: "0.25rem",
                width: "100%",
                "&:hover": {
                  background: theme.palette.neutral.light,
                  cursor: "pointer",
                  transition: "background 0.5s",
                },
              }}
            >
              {isNewMessage && (
                <Box
                  sx={{
                    padding: 1,
                    borderRadius: 50,
                    width: 10,
                    height: 10,
                    fontSize: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: theme.palette.background.alt,
                  }}
                >
                  {newMessages}
                </Box>
              )}
              {USER_NAME}
              <RemoveIcon />
            </Box>
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
              <div ref={scrollRef} />
            </Box>
            <MessageInput
              sendMessage={sendMessage}
              seeNewMessage={seeNewMessage}
            />
          </Box>
        ) : (
          <Box
            sx={{
              padding: "0.5rem 1rem",
              gap: 1,
              display: "flex",
              alignItems: "center",
              borderRadius: "0.25rem",
              width: "100%",
              "&:hover": {
                background: theme.palette.neutral.light,
                cursor: "pointer",
                transition: "background 0.5s",
              },
            }}
            onClick={handleOpenChat}
          >
            {isNewMessage && (
              <Box
                sx={{
                  padding: 1,
                  borderRadius: 50,
                  width: 10,
                  height: 10,
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: theme.palette.background.alt,
                }}
              >
                {newMessages}
              </Box>
            )}
            <Typography>{USER_NAME}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default ConversationChat;
