import { Box, List, ListItem, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import UserImage from "components/UserImage";
import { useNavigate } from "react-router-dom";

const Participants = ({ users }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  return (
    <WidgetWrapper maxHeight="40vh" overflow="auto" mt={1}>
      <Typography variant="h4">Participants</Typography>
      <List>
        {users.map(({ firstName, lastName, picturePath, _id }, key) => (
          <ListItem
            onClick={() => navigate("/profile/" + _id)}
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
                <UserImage image={picturePath} size="24px" userId={_id} />
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
