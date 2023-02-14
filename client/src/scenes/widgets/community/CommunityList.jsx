import { List, ListItem, Typography, useTheme } from "@mui/material";

import FlexBetween from "components/FlexBetween";
import Loader from "components/Loader";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommunityList = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.mediumMain;
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
        {myCommunities.map(({ name, category, users, _id }, key) => (
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
                <Typography color={main}>{name}</Typography>
                <FlexBetween width={"120px"}>
                  <Typography color={medium}>{category}</Typography>
                  <Typography color={main}>{users.length}</Typography>
                </FlexBetween>
              </FlexBetween>
            </ListItem>
          </Link>
        ))}
      </List>
    </WidgetWrapper>
  );
};

export default CommunityList;
