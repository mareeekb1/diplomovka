import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import FriendsSuggestions from "../general/FriendsSuggestions";
import MyPostWidget from "../MyPostWidget";
import PostsWidget from "../PostsWidget";
import CommunityDetailWidget from "./CommunityDetailWidget";
import Participants from "./Participants";

const CommunityPosts = ({ communityId, community }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box
      width="100%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isNonMobileScreens ? "31%" : undefined}>
        <CommunityDetailWidget communityId={communityId} />
        <Participants users={community ? community.users : []} />
        <FriendsSuggestions userId={_id} communityId={community._id} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "69%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <MyPostWidget picturePath={picturePath} />
        <PostsWidget userId={_id} communityId={communityId} />
      </Box>
    </Box>
  );
};

export default CommunityPosts;
