import { Typography, Box, useTheme } from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import Loader from "components/Loader";
import UserImage from "components/UserImage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendList = ({ openConversation }) => {
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
  if (!loadedFriends) return <Loader />;
  return (
    <Box width="100%" gap={1}>
      {loadedFriends.map((item, key) => (
        <Box
          onClick={() => openConversation(item._id)}
          key={key}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": {
              background: theme.palette.neutral.medium,
              cursor: "pointer",
              transition: "background 0.5s",
              borderRadius: 1,
            },
          }}
        >
          <UserImage image={item.picturePath} size="16px" />
          <Typography
            fontSize={"16px"}
          >{`${item.firstName} ${item.lastName}`}</Typography>
        </Box>
      ))}
    </Box>
  );
};
export default FriendList;
