import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { getRequest, postRequest } from "api";
import { api } from "api/routes";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Close, Remove as RemoveIcon } from "@mui/icons-material";
import io from "socket.io-client";
import MessageInput from "./MessageInput";
import Message from "components/Message";
import Loader from "components/Loader";

const WIDGET_WIDTH = 250;

const ConversationChat = ({
  index,
  updateConversation,
  openConversation,
  ...props
}) => {
  const { open, _id, members } = props;

  const theme = useTheme();
  const user = useSelector((state) => state.user);

  const scrollRef = useRef();
  const [openedRef, setOpenedRef] = useState(scrollRef);
  const [friendReceiver, setFriendReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState({
    from: 0,
    to: 10,
  });

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
  }, [SOCKET_SERVER_URL, user._id]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (mess) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...mess, isNew: true },
      ]);
      if (openedRef.current && open) {
        openedRef.current.scrollIntoView();
      }
    });

    return () => {
      socket.off("getMessage");
    };
  }, [open, openedRef, socket]);

  useEffect(() => {
    async function getUserName() {
      const friend = members.find((item) => item !== user._id);
      if (friend) {
        const request = await getRequest(api.users.getUserById(friend));
        if (request) setFriendReceiver(request);
      }
    }
    async function getMessages() {
      setLoading(true);
      const request = await getRequest(
        api.messages.get(_id, limit.from, limit.to)
      );
      if (request) setMessages(request);
      setLoading(false);
    }
    getUserName();
    getMessages();
  }, [_id, limit.from, limit.to, members, user._id, limit]);

  async function handleOpenChat() {
    updateConversation(_id, "open", true);
    setOpenedRef(scrollRef);
    await seeNewMessage();
  }
  function handleCloseChat() {
    updateConversation(_id, "open", false);
    setOpenedRef({ current: null, ...openedRef });
  }
  async function seeNewMessage() {
    setMessages(messages.map(({ isNew, ...rest }) => rest));
    await postRequest(api.messages.read, { id: _id });
  }

  async function sendMessage(text) {
    const request = await postRequest(api.messages.send, {
      text: text,
      conversationId: _id,
      senderId: user._id,
      senderName: user.firstName,
      senderLastName: user.lastName,
      isNew: true,
    });
    if (request) {
      socket.emit("sendMessage", {
        senderId: socket.id,
        receiverId: friendReceiver._id,
        ...request,
      });
      setMessages([...messages, { ...request, isNew: false }]);
      if (Boolean(openedRef.current) && open) {
        openedRef.current.scrollIntoView();
      }
    }
  }

  useEffect(() => {
    if (openedRef.current && open) {
      openedRef.current.scrollIntoView();
    }
  }, [open, openedRef, messages]);

  const onScroll = () => {
    const rootElem = document.getElementById("messagesRoot");
    const scrollTop = rootElem.scrollTop;
    if (scrollTop === 0) {
      setLoading(true);
      setLimit((prev) => ({ ...prev, to: prev.to + 10 }));
    }
  };
  useEffect(() => {
    const root = document.getElementById("messagesRoot");
    root.addEventListener("scroll", onScroll);
    return () => {
      root.removeEventListener("scroll", onScroll);
    };
  }, []);

  const newMessages = messages.filter((item) => item.isNew).length;
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
              {friendReceiver
                ? `${friendReceiver.firstName} ${friendReceiver.lastName}`
                : "..."}
              <RemoveIcon />
            </Box>
            <Box
              id="messagesRoot"
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
              {loading && (
                <Box id="loader">
                  <Loader />
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
              padding: "0.2rem 1rem",
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
                  width: 12,
                  height: 12,
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: theme.palette.background.alt,
                }}
              >
                <span style={{ marginLeft: "-2px" }}>{newMessages}</span>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>
                {friendReceiver
                  ? `${friendReceiver.firstName} ${friendReceiver.lastName}`
                  : "..."}
              </Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => openConversation(friendReceiver._id)}
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default ConversationChat;
