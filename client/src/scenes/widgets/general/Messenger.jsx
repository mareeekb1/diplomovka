import {
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";
import {
  Remove as RemoveIcon,
  Message as MessageIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import { getRequest } from "api";
import { api } from "api/routes";
import Loader from "components/Loader";
import UserImage from "components/UserImage";
import Message from "components/Message";

const Wrapper = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 4,
  right: 4,
  zIndex: 100,
}));

const Messenger = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const [loadedFriends, setLoadedFriends] = useState(null);

  useEffect(() => {
    async function getFriends() {
      const request = await getRequest(api.users.getFriends(user._id));
      if (request) setLoadedFriends(request);
    }
    if (!loadedFriends) {
      getFriends();
    }
  }, []);

  const FriendList = () => {
    if (!loadedFriends) return <Loader />;
    return (
      <Box>
        {loadedFriends.map((item, key) => (
          <Box key={key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <UserImage image={item.picturePath} size="16px" />
            <Typography
              fontSize={"16px"}
            >{`${item.firstName} ${item.lastName}`}</Typography>
          </Box>
        ))}
      </Box>
    );
  };
  const Messages = () => {
    const scrollRef = useRef();

    useEffect(() => {
      const elemRef = scrollRef.current;
      elemRef.scrollIntoView({ behavior: "smooth" });
    }, []);
    return (
      <Box
        sx={{
          background: theme.palette.background.alt,
          width: "100%",
          overflow: "auto",
        }}
      >
        <Box mt={1}>
          <Message
            content={"Textasdsa das dasd asa"}
            firstName={"test1"}
            lastName={"stes"}
            id={"s"}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textsadjsajasj asda sdasd asd"}
            firstName={"test2"}
            lastName={"tesaf"}
            id={user._id}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textasdsa das dasd asa"}
            firstName={"test1"}
            lastName={"stes"}
            id={"s"}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textsadjsajasj asda sdasd asd"}
            firstName={"test2"}
            lastName={"tesaf"}
            id={user._id}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textasdsa das dasd asa"}
            firstName={"test1"}
            lastName={"stes"}
            id={"s"}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textsadjsajasj asda sdasd asd"}
            firstName={"test2"}
            lastName={"tesaf"}
            id={user._id}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textasdsa das dasd asa"}
            firstName={"test1"}
            lastName={"stes"}
            id={"s"}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textsadjsajasj asda sdasd asd"}
            firstName={"test2"}
            lastName={"tesaf"}
            id={user._id}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textasdsa das dasd asa"}
            firstName={"test1"}
            lastName={"stes"}
            id={"s"}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textsadjsajasj asda sdasd asd"}
            firstName={"test2"}
            lastName={"tesaf"}
            id={user._id}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textasdsa das dasd asa"}
            firstName={"test1"}
            lastName={"stes"}
            id={"s"}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textsadjsajasj asda sdasd asd"}
            firstName={"test2"}
            lastName={"tesaf"}
            id={user._id}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textasdsa das dasd asa"}
            firstName={"test1"}
            lastName={"stes"}
            id={"s"}
          />
        </Box>
        <Box mt={1}>
          <Message
            content={"Textsadjsajasj asda sdasd asd"}
            firstName={"test2"}
            lastName={"tesaf"}
            id={user._id}
          />
        </Box>
        <div ref={scrollRef} />
        <TextField
          sx={{ position: "sticky", mt: 1, borderTop: "1px solid" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SendIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
          fullWidth
          multiline
          maxRows={8}
        />
      </Box>
    );
  };

  return (
    <Wrapper>
      {!open && (
        <Box
          gap={1}
          display="flex"
          onClick={() => setOpen(!open)}
          sx={{
            borderRadius: "0.25rem",
            backgroundColor: theme.palette.background.alt,
            padding: "0.5rem 1rem",
            "&:hover": {
              background: theme.palette.neutral.light,
              cursor: "pointer",
              transition: "background 0.5s",
            },
          }}
        >
          <Typography>Messages</Typography>
          <MessageIcon />
        </Box>
      )}
      {open && (
        <Box
          sx={{
            width: "500px",
            display: "block",
            borderRadius: "0.25rem",
            backgroundColor: theme.palette.neutral.light,
            padding: "0.5rem 1rem",
          }}
        >
          <FlexBetween
            onClick={() => setOpen(!open)}
            sx={{
              cursor: "pointer",
            }}
          >
            <Typography variant="h4">Messages</Typography>
            <RemoveIcon />
          </FlexBetween>
          <Divider />
          <Box sx={{ display: "flex", height: "500px" }}>
            <Box sx={{ height: "100%", width: "70%", display: "flex" }}>
              <Messages />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ height: "100%", padding: "0.5rem", width: "30%" }}>
              <Typography>Friends</Typography>
              <FriendList />
            </Box>
          </Box>
        </Box>
      )}
    </Wrapper>
  );
};

export default Messenger;
