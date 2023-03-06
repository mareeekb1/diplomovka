import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import WidgetWrapper from "components/WidgetWrapper";
import Message from "components/Message";
import React, { useEffect, useRef } from "react";

const dummyMessages = [
  {
    id: "63e7a506ba14d1ed961373ba",
    firstName: "Marek",
    lastName: "Belej",
    content: "text",
  },
  {
    id: "63ae27f61da0c1faf04891ss",
    firstName: "John",
    lastName: "Doe",
    content: "text",
  },
  {
    id: "63e7a506ba14d1ed961373ba",
    firstName: "Marek",
    lastName: "Belej",
    content: "text",
  },
  {
    id: "63ae27f61da0c1faf04891ss",
    firstName: "John",
    lastName: "Doe",
    content: "text",
  },
  {
    id: "63e7a506ba14d1ed961373ba",
    firstName: "Marek",
    lastName: "Belej",
    content: "text",
  },
  {
    id: "63ae27f61da0c1faf04891ss",
    firstName: "John",
    lastName: "Doe",
    content: "text",
  },
  {
    id: "64036d7ee876e7aa109150ea",
    firstName: "Vlado",
    lastName: "Putin",
    content: "tedaxt",
  },
  {
    id: "64036d7ee876e7aa109150ea",
    firstName: "Vlado",
    lastName: "Putin",
    content: "tedaxt",
  },
  {
    id: "64036d7ee876e7aa109150ea",
    firstName: "Vlado",
    lastName: "Putin",
    content: "tedaxt",
  },
];

const CommunityContainer = () => {
  const { palette } = useTheme();
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <WidgetWrapper
      sx={{
        height: "80%",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        borderRadius: "0.25rem 0 0 0.25rem",
        width: "-webkit-fill-available",
      }}
    >
      <Typography variant="h4">Community converastion</Typography>
      <Divider />
      <List sx={{ marginBottom: "0.5rem", height: "100%", overflow: "auto" }}>
        {dummyMessages.map((item, key) => (
          <ListItem sx={{ paddingX: 0 }} key={key}>
            <Message key={key} content {...item} />
          </ListItem>
        ))}
        <div ref={scrollRef} />
      </List>
      <Box position="sticky" bottom={0}>
        <FormControl
          fullWidth
          sx={{
            background: palette.background.default,
          }}
        >
          <OutlinedInput
            id="outlined-adornment-amount"
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <SendIcon
                    sx={{
                      color: palette.primary.main,
                      "&:hover": {
                        color: palette.primary.dark,
                        cursor: "pointer",
                        transition: "color 0.5s",
                      },
                    }}
                  />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </WidgetWrapper>
  );
};

export default CommunityContainer;
