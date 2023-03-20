import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";

import DetailPage from "./DetailPage";
import DiscoverPage from "./DiscoverPage";

const ComunityPage = () => {
  const { communityId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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
        {!communityId ? <DiscoverPage /> : <DetailPage />}
      </Box>
    </Box>
  );
};

export default ComunityPage;
