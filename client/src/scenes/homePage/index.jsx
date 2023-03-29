import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendsSuggestions from "scenes/peoplePage/FriendsSuggestions";
import CommunityList from "scenes/widgets/community/CommunityList";
import AdvertWidget from "scenes/widgets/general/AdvertWidget";

const HomePage = () => {
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
        <Box flexBasis={isNonMobileScreens ? "24%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
          <CommunityList />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "52%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="24%">
            <AdvertWidget />
            <FriendsSuggestions userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
