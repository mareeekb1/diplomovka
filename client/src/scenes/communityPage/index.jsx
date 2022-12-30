import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import CommunityContainer from "scenes/widgets/community/CommunityContainer";
import CommunityList from "scenes/widgets/community/CommunityList";
import Participants from "scenes/widgets/community/Participants";

const ComunityPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <CommunityList />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "48%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <CommunityContainer />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="20%">
            <Participants />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ComunityPage;
