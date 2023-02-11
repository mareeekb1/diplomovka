import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import CommunityContainer from "scenes/widgets/community/CommunityContainer";
import CommunityList from "scenes/widgets/community/CommunityList";
import CommunityDiscover from "scenes/widgets/community/CommunityDiscover";
import Participants from "scenes/widgets/community/Participants";

const ComunityPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { communityId } = useParams();
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
        {isNonMobileScreens ? (
          <>
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <CommunityList />
            </Box>
            <Box
              flexBasis={isNonMobileScreens ? "48%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              {communityId ? <CommunityContainer /> : <CommunityDiscover />}
            </Box>
            <Box flexBasis="20%">
              <Participants />
            </Box>
          </>
        ) : (
          <Box
            flexBasis={isNonMobileScreens ? "48%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <CommunityContainer />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ComunityPage;
