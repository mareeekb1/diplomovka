import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import MyPostWidget from "../MyPostWidget";
import PostsWidget from "../PostsWidget";
import UserWidget from "../UserWidget";

const CommunityPosts = () => {
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
        <UserWidget userId={_id} picturePath={picturePath} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "69%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <MyPostWidget picturePath={picturePath} />
        <PostsWidget userId={_id} />
      </Box>
    </Box>
  );
};

export default CommunityPosts;
