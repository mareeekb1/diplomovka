import { Box, List, ListItem, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import UserImage from "components/UserImage";

const Participants = ({ users }) => {
  const { palette } = useTheme();

  return (
    <WidgetWrapper maxHeight="40vh" overflow="auto">
      <Typography variant="h4">Participants</Typography>
      <List>
        {users.map(({ firstName, lastName, picturePath }, key) => (
          <ListItem
            key={key}
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
                transition: "color 0.5s",
              },
            }}
          >
            <Box mr="1rem">
              {picturePath ? (
                <UserImage image={picturePath} size="24px" />
              ) : (
                <PersonIcon sx={{ fontSize: "24px" }} />
              )}
            </Box>
            <Typography>{`${firstName} ${lastName}`}</Typography>
          </ListItem>
        ))}
      </List>
    </WidgetWrapper>
  );
};

export default Participants;
