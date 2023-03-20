import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import Message from "components/Message";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { getRequest, postRequest } from "api";
import { api } from "api/routes";
import Loader from "components/Loader";
import ChatContainerInput from "./ChatContainerInput";

const CommunityContainer = ({ chatId }) => {
  const scrollRef = useRef();
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const SOCKET_SERVER_URL = "http://localhost:3002";
  const [socket, setSocket] = useState(null);
  // Connect to the socket server on component mount
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socket.emit("join", { userId: user._id, chatId: chatId });
    setSocket(socket);

    // Disconnect from socket server on component unmount
    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, [SOCKET_SERVER_URL, chatId, user._id]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (mess) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...mess, isNew: true },
      ]);
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView();
      }
    });

    return () => {
      socket.off("getMessage");
    };
  }, [scrollRef, socket]);

  useEffect(() => {
    async function getConversation() {
      setIsLoading(true);
      const request = await getRequest(api.conversation.get(chatId));
      if (request) {
        setMessages(request.messages);
      }
      setIsLoading(false);
    }
    getConversation();
  }, [chatId]);

  useEffect(() => {
    if (!isLoading) scrollRef.current.scrollIntoView();
  }, [isLoading, messages]);

  async function sendMessage(text) {
    const request = await postRequest(api.messages.send, {
      text: text,
      conversationId: chatId,
      senderId: user._id,
      senderName: user.firstName,
      senderLastName: user.lastName,
      isNew: true,
    });
    if (request) {
      socket.emit("sendMessage", {
        senderId: socket.id,
        chatId: chatId,
        ...request,
      });
      setMessages([...messages, { ...request, isNew: false }]);
    }
  }

  return (
    <WidgetWrapper
      sx={{
        height: "80%",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        borderRadius: "0.25rem 0 0 0.25rem",
        padding: 0,
        width: "400px",
      }}
    >
      <Typography p="1rem" variant="h4" width={"100%"}>
        Community converastion
      </Typography>
      <Divider />
      {isLoading ? (
        <Loader />
      ) : (
        <List
          sx={{
            marginBottom: "0.5rem",
            height: "100%",
            overflow: "auto",
            p: "0.5rem",
          }}
        >
          {messages.map((item, key) => (
            <ListItem sx={{ padding: "2px 0" }} key={key}>
              <Message
                content={item.text}
                firstName={item.senderName}
                lastName={item.senderLastName}
                id={item.senderId}
                sendOn={item.createdAt}
              />
            </ListItem>
          ))}
          <div ref={scrollRef} />
        </List>
      )}
      <Divider />
      <Box position="sticky" bottom={0}>
        <ChatContainerInput sendMessage={sendMessage} />
      </Box>
    </WidgetWrapper>
  );
};

export default CommunityContainer;
