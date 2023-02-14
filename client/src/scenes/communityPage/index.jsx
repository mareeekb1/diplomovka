import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import CommunityContainer from "scenes/widgets/community/CommunityContainer";
import CommunityList from "scenes/widgets/community/CommunityList";
import CommunityDiscover from "scenes/widgets/community/CommunityDiscover";
import CreateCommunity from "scenes/widgets/community/CreateCommunity";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRequest } from "api";
import { api } from "api/routes";
import { setAllCommunities } from "state";
import Participants from "scenes/widgets/community/Participants";
import CommunityPosts from "scenes/widgets/community/CommunityPosts";

const ComunityPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { communityId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const request = await getRequest(api.community.default);
      if (request) dispatch(setAllCommunities(request));
    }
    fetchData();
  }, [dispatch]);
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
        {!communityId ? (
          <>
            {isNonMobileScreens ? (
              <>
                <Box flexBasis={"20%"}>
                  <CreateCommunity />
                </Box>
                <Box
                  flexBasis={isNonMobileScreens ? "48%" : undefined}
                  mt={isNonMobileScreens ? undefined : "2rem"}
                >
                  {communityId ? <CommunityContainer /> : <CommunityDiscover />}
                </Box>
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                  <CommunityList />
                </Box>
              </>
            ) : (
              <Box
                flexBasis={isNonMobileScreens ? "48%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
              >
                <CommunityDiscover />
              </Box>
            )}
          </>
        ) : (
          <>
            {isNonMobileScreens ? (
              <>
                <Box
                  flexBasis={isNonMobileScreens ? "48%" : undefined}
                  mt={isNonMobileScreens ? undefined : "2rem"}
                >
                  <CommunityPosts />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default ComunityPage;
