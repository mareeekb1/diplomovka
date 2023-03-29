import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import CommunityList from "scenes/widgets/community/CommunityList";
import AdvertWidget from "scenes/widgets/general/AdvertWidget";
import FriendsSuggestions from "scenes/peoplePage/FriendsSuggestions";
import UserWidget from "scenes/widgets/UserWidget";
import FriendRequest from "./FriendRequest";

const PeoplePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="0.75rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
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
          <FriendRequest />
          <FriendsSuggestions userId={_id} empty />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="24%" className="stickyWidget">
            <AdvertWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PeoplePage;
