import { Box, useMediaQuery } from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/general/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import FriendsSuggestions from "scenes/widgets/general/FriendsSuggestions";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const myId = useSelector((state) => state.user._id);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    async function getUser() {
      const request = await getRequest(api.users.getUserById(userId));
      setUser(request);
    }
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="0.75rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "24%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m={1} />
          <FriendListWidget userId={userId} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "52%" : undefined}>
          <MyPostWidget picturePath={user.picturePath} />
          <Box m={1} />
          <PostsWidget userId={userId} isProfile />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "24%" : undefined}>
          <AdvertWidget />
          <FriendsSuggestions userId={myId} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
