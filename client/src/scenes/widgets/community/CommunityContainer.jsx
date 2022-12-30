import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import WidgetWrapper from "components/WidgetWrapper";
import Message from "components/Message";
import React from "react";

const dummyMessages = [
  {
    id: "63ae27f61da0c1faf0489131",
    firstName: "Marek",
    lastName: "Belej",
    content:
      "Ahoj Ninka, dufam ze prides co skoro z prace a konecne si oddychnes",
  },
  {
    id: "63ae27f61da0c1faf04891ss",
    firstName: "Ninka",
    lastName: "Hornakova",
    content: "Ahoj, uz pomaly budem koncit.",
  },
  {
    id: "63ae27f61da0c1faf0489131",
    firstName: "Marek",
    lastName: "Belej",
    content:
      "Bol to pre teba velmi dlhy den a po tych troch dnoch velmi namahavy",
  },
  {
    id: "63ae27f61da0c1faf04891ss",
    firstName: "Ninka",
    lastName: "Hornakova",
    content: "Ano, uz som rada ze budem mat volno",
  },
  {
    id: "63ae27f61da0c1faf0489131",
    firstName: "Marek",
    lastName: "Belej",
    content: "Lubim ta",
  },
  {
    id: "63ae27f61da0c1faf04891ss",
    firstName: "Ninka",
    lastName: "Hornakova",
    content: "Aj ja teba ♥",
  },
];

const CommunityContainer = () => {
  const { palette } = useTheme();
  return (
    <WidgetWrapper sx={{ height: "80vh", overflow: "auto" }}>
      <List sx={{ marginBottom: "0.5rem", height: "100%" }}>
        {dummyMessages.map((item, key) => (
          <ListItem sx={{ paddingX: 0 }}>
            <Message key={key} content {...item} />
          </ListItem>
        ))}
      </List>
      <Box position="sticky" bottom="0">
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
