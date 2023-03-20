import { Box, Divider, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  Remove as RemoveIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import { getRequest, postRequest } from "api";
import { api } from "api/routes";
import FriendList from "./FriendList";
import ConversationChat from "./ConversationChat";

const Wrapper = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 4,
  right: 4,
  zIndex: 100,
}));

const Messenger = () => {
  const [open, setOpen] = useState(false);
  const [conversations, setConversations] = useState(null);
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchConversations() {
      const request = await getRequest(
        api.conversation.getUserConversations(user._id)
      );
      if (request) {
        setConversations(formatConversations(request));
      }
    }
    if (!conversations) fetchConversations();
  }, [conversations, user._id]);

  async function getConversation(friendId) {
    const isExisting = conversations.find(
      (item) =>
        item.members.includes(friendId) &&
        item.members.includes(user._id) &&
        item.members.length === 2
    );
    if (!isExisting) {
      const request = await postRequest(api.conversation.create, {
        userId: user._id,
        members: [user._id, friendId],
        friendId: friendId,
      });
      if (request) {
        const updatedConversations = conversations.concat([request]);
        setConversations(formatConversations(updatedConversations));
      }
      return request;
    }
    return isExisting;
  }
  function formatConversations(cons) {
    if (!cons) return [];
    return cons.reverse().map((item) => {
      const { newMessage, open, toggled } = item;
      return {
        newMessage: Boolean(newMessage),
        open: Boolean(open),
        toggled: Boolean(toggled),
        ...item,
      };
    });
  }
  function updateConversation(conversationId, field, value) {
    const index = conversations.findIndex(
      (item) => item._id === conversationId
    );
    if (index >= 0) {
      let newArray = [...conversations];
      newArray[index][field] = value;
      setConversations(newArray);
    }
  }
  async function openConversation(friendId) {
    const conversation = await getConversation(friendId);
    if (!conversation.toggled) {
      updateConversation(conversation._id, "open", true);
      updateConversation(conversation._id, "toggled", true);
    } else {
      updateConversation(conversation._id, "open", false);
      updateConversation(conversation._id, "toggled", false);
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      {Boolean(conversations) &&
        conversations
          .filter((item) => item.toggled)
          .map((item, key) => (
            <ConversationChat
              key={key}
              index={key}
              updateConversation={updateConversation}
              {...item}
            />
          ))}
      <Wrapper width={"200px"}>
        {!open && (
          <Box
            gap={1}
            display="flex"
            onClick={() => setOpen(!open)}
            justifyContent="space-between"
            sx={{
              borderRadius: "0.25rem",
              backgroundColor: theme.palette.background.alt,
              padding: "0.5rem 1rem",
              border: "1px solid",
              borderColor: theme.palette.neutral.main,
              "&:hover": {
                background: theme.palette.neutral.light,
                cursor: "pointer",
                transition: "background 0.5s",
              },
            }}
          >
            <Typography>Messages</Typography>
            <MessageIcon />
          </Box>
        )}
        {open && (
          <Box
            sx={{
              display: "block",
              borderRadius: "0.25rem",
              backgroundColor: theme.palette.background.alt,
              border: "1px solid",
              padding: "0.5rem 1rem",
            }}
          >
            <FlexBetween
              onClick={() => setOpen(!open)}
              sx={{
                cursor: "pointer",
              }}
            >
              <Typography variant="h6">Friends</Typography>
              <RemoveIcon />
            </FlexBetween>
            <Divider />
            <Box sx={{ display: "flex", height: "500px" }}>
              <Box sx={{ height: "100%", width: "100%" }}>
                <FriendList openConversation={openConversation} />
              </Box>
            </Box>
          </Box>
        )}
      </Wrapper>
    </Box>
  );
};

export default Messenger;
