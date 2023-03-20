import { Typography, Box, useTheme } from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import Loader from "components/Loader";
import UserImage from "components/UserImage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendList = ({ openConversation, conversations }) => {
  const userId = useSelector((state) => state.user._id);
  const theme = useTheme();
  const [loadedFriends, setLoadedFriends] = useState(null);
  useEffect(() => {
    async function getFriends() {
      const request = await getRequest(api.users.getFriends(userId));
      if (request) setLoadedFriends(request);
    }
    getFriends();
  }, [userId]);

  function pairFriendAndConversation(friendId) {
    if (!conversations) return null;
    let item;
    conversations.forEach((conversation) => {
      if (
        conversation.members.length === 2 &&
        conversation.members.includes(friendId)
      ) {
        item = conversation.messages.filter((message) => message.isNew).length;
      }
    });
    if (item === 0) return null;
    return item;
  }

  if (!loadedFriends) return <Loader />;

  return (
    <Box width="100%" gap={1} padding={"0.5rem 0.25rem"}>
      {loadedFriends.map((item, key) => (
        <Box
          onClick={() => openConversation(item._id)}
          key={key}
          sx={{
            display: "flex",
            alignItems: "center",
            p: "0.2rem 0.2rem",
            gap: 1,
            borderRadius: 1,
            mb: 0.25,
            background: pairFriendAndConversation(item._id)
              ? theme.palette.primary.dark
              : "",
            "&:hover": {
              background: theme.palette.neutral.medium,
              cursor: "pointer",
              transition: "background 0.5s",
            },
          }}
        >
          <UserImage image={item.picturePath} size="16px" />
          <Typography
            fontSize={"16px"}
          >{`${item.firstName} ${item.lastName}`}</Typography>
          {pairFriendAndConversation(item._id) && (
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
              <span style={{ marginLeft: "-2px" }}>
                {pairFriendAndConversation(item._id)}
              </span>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
export default FriendList;
