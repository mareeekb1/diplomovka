import { Box, List, ListItem, Typography, useTheme } from "@mui/material";

import FlexBetween from "components/FlexBetween";
import Icon from "components/Icon";
import Loader from "components/Loader";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommunityList = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const darkHover = palette.primary.dark;
  const myCommunities = useSelector((state) => state.myCommunities);

  if (!myCommunities)
    return (
      <WidgetWrapper maxHeight="80vh" overflow="auto">
        <Loader />
      </WidgetWrapper>
    );
  return (
    <WidgetWrapper maxHeight="80vh" overflow="auto">
      <Typography color={dark} variant="h4" fontWeight="500">
        Your communities
      </Typography>
      <List>
        {myCommunities.map(({ name, users, _id, icon }, key) => (
          <Link to={"/community/" + _id} key={key}>
            <ListItem>
              <FlexBetween
                p="0.5rem 0.75rem"
                sx={{
                  width: "100%",
                  "&:hover": {
                    background: darkHover,
                    transition: "0.5s background",
                    borderRadius: "0.75rem",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Icon name={icon} sx={{ mr: 2, color: main }} />
                  <Box>
                    <Typography color={main}>{name}</Typography>
                    <Typography color={main} fontSize={10}>
                      Number of members: {users.length}
                    </Typography>
                  </Box>
                </Box>
              </FlexBetween>
            </ListItem>
          </Link>
        ))}
      </List>
    </WidgetWrapper>
  );
};

export default CommunityList;
