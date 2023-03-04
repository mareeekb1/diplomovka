import { Box, useMediaQuery } from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import Loader from "components/Loader";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommunityContainer from "scenes/widgets/community/CommunityContainer";
import CommunityPosts from "scenes/widgets/community/CommunityPosts";
import Participants from "scenes/widgets/community/Participants";
import FriendsSuggestions from "scenes/widgets/general/FriendsSuggestions";
import { setCommunityDetail } from "state";

function DetailPage() {
  const { communityId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const community = useSelector((state) => state.community);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (communityId) {
        const communityRequest = await getRequest(
          api.community.getByCommunityId(communityId)
        );
        if (communityRequest) {
          dispatch(setCommunityDetail(communityRequest));
        } else {
          dispatch(setCommunityDetail(null));
        }
      } else {
        dispatch(setCommunityDetail(null));
      }
    }
    fetchData();
  }, [communityId, dispatch]);

  if (!community) {
    return (
      <WidgetWrapper sx={{ height: "50vh", width: "100%", overflow: "auto" }}>
        <Loader />
      </WidgetWrapper>
    );
  }
  return (
    <>
      {isNonMobileScreens ? (
        <>
          <Box
            flexBasis={isNonMobileScreens ? "76%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <CommunityPosts communityId={communityId} community={community} />
          </Box>
          <Box flexBasis={isNonMobileScreens ? "24%" : undefined}>
            <CommunityContainer />
          </Box>
        </>
      ) : (
        <Box
          flexBasis={isNonMobileScreens ? "48%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <CommunityPosts communityId={communityId} community={community} />
          <CommunityContainer />
        </Box>
      )}
    </>
  );
}

export default DetailPage;
