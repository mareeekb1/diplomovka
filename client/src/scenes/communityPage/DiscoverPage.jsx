import { Box, useMediaQuery } from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CommunityList from "scenes/widgets/community/CommunityList";
import CreateCommunity from "scenes/widgets/community/CreateCommunity";
import CommunityDiscover from "scenes/widgets/community/CommunityDiscover";
import { setAllCommunities } from "state";

function DiscoverPage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const request = await getRequest(api.community.default);
      if (request) dispatch(setAllCommunities(request));
    }
    fetchData();
  }, [dispatch]);
  return (
    <>
      {isNonMobileScreens ? (
        <>
          <Box flexBasis={"24%"}>
            <CreateCommunity />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "52%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <CommunityDiscover />
          </Box>
          <Box flexBasis={isNonMobileScreens ? "24%" : undefined}>
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
  );
}

export default DiscoverPage;
