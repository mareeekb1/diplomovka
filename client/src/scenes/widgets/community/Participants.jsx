import { Box, List, ListItem, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import UserImage from "components/UserImage";
const dummyParticipants = [
  {
    userId: 120,
    firstName: "Marek",
    lastName: "Belej",
    imagePath: "herov2.png",
  },
  { userId: 121, firstName: "Jonh", lastName: "Doe", imagePath: null },
  { userId: 122, firstName: "Parek", lastName: "Teo", imagePath: null },
  { userId: 123, firstName: "Jozef", lastName: "Mrkva", imagePath: null },
  { userId: 124, firstName: "Pavol", lastName: "Kto", imagePath: null },
  { userId: 125, firstName: "Peter", lastName: "Tutto", imagePath: null },
  { userId: 126, firstName: "Jan", lastName: "Kost", imagePath: null },
  { userId: 127, firstName: "Marian", lastName: "Ceko", imagePath: null },
];
const Participants = () => {
  const { palette } = useTheme();

  return (
    <WidgetWrapper maxHeight="80vh" overflow="auto">
      <Typography variant="h4">Participants</Typography>
      <List>
        {dummyParticipants.map(({ firstName, lastName, imagePath }, key) => (
          <ListItem
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
                transition: "color 0.5s",
              },
            }}
          >
            <Box mr="1rem">
              {imagePath ? (
                <UserImage image={imagePath} size="30px" />
              ) : (
                <PersonIcon sx={{ fontSize: "30px" }} />
              )}
            </Box>
            <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
          </ListItem>
        ))}
      </List>
    </WidgetWrapper>
  );
};

export default Participants;
