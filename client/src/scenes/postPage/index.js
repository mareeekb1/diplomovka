import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendsSuggestions from "scenes/peoplePage/FriendsSuggestions";
import CommunityList from "scenes/widgets/community/CommunityList";
import AdvertWidget from "scenes/widgets/general/AdvertWidget";
import PostWidget from "../widgets/PostWidget";

import UserWidget from "scenes/widgets/UserWidget";
import { getRequest } from "api";
import { api } from "api/routes";
import Loader from "components/Loader";

const PostPage = () => {
  const { id } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  useEffect(() => {
    async function getPost() {
      const request = await getRequest(api.posts.getSinglePost(id));
      setPost(request);
    }
    getPost();
  }, [id]);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="0.75rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        height="100%"
      >
        <Box
          flexBasis={isNonMobileScreens ? "24%" : undefined}
          className="stickyWidget"
        >
          <UserWidget userId={_id} picturePath={picturePath} />
          <CommunityList />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "52%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {post ? <PostWidget {...post} /> : <Loader />}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="24%" className="stickyWidget">
            <AdvertWidget />
            <FriendsSuggestions userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostPage;
