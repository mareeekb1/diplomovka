import { List, Typography, useTheme } from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriendRequests } from "state";
import FriendItem from "./FriendItem";

const FriendRequest = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const toMeRequests = useSelector((state) => state.friendRequests);
  const [fromMeRequests, setFromMeRequests] = useState([]);

  useEffect(() => {
    async function getFriendRequests() {
      const request = await getRequest(api.users.getFriendRequests(user._id));
      dispatch(setFriendRequests(request));
    }
    async function getPendingFriendRequests() {
      const request = await getRequest(
        api.users.getPendingFriendRequests(user._id)
      );
      setFromMeRequests(request);
    }
    getPendingFriendRequests();
    getFriendRequests();
  }, [dispatch, user._id]);

  function handleRequest(id) {
    const newRequests = toMeRequests.filter((item) => item._id !== id);
    dispatch(setFriendRequests(newRequests));
  }

  return (
    <WidgetWrapper>
      <Typography variant="h4">Requests</Typography>
      <Typography variant="subtitle1">Want to be friends</Typography>
      {!toMeRequests.length && (
        <Typography sx={{ color: theme.palette.neutral.medium }}>
          No friend requests for now
        </Typography>
      )}
      <List>
        {toMeRequests.map((from, key) => (
          <FriendItem
            {...from}
            key={key}
            toBeHandled
            handleRequest={handleRequest}
          />
        ))}
      </List>
      <Typography variant="subtitle1">Pending equests</Typography>
      {!fromMeRequests.length && (
        <Typography sx={{ color: theme.palette.neutral.medium }}>
          No pending friend requests, search for new people
        </Typography>
      )}
      <List>
        {fromMeRequests.map((from, key) => (
          <FriendItem {...from} key={key} />
        ))}
      </List>
    </WidgetWrapper>
  );
};

export default FriendRequest;
