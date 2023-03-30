import { Check, Close } from "@mui/icons-material";
import { Box, IconButton, Skeleton, Typography, useTheme } from "@mui/material";
import { getRequest, postRequest } from "api";
import { api } from "api/routes";
import UserImage from "components/UserImage";
import moment from "moment";
import React, { useEffect, useState } from "react";

const FriendItem = ({
  createdAt,
  toUserId,
  toBeHandled,
  fromUserId,
  _id,
  handleRequest,
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const createdAtMoment = moment(createdAt);
  const processId = toBeHandled ? fromUserId : toUserId;

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const request = await getRequest(api.users.getUserById(processId));
      if (request) setUser(request);
      setLoading(false);
    }
    getUser();
  }, [processId]);

  async function handleAcceptRequest(accepted) {
    await postRequest(api.users.handleFriendRequest, {
      id: _id,
      accepted: accepted,
    });
    handleRequest(_id);
  }

  if (loading && !user)
    return (
      <Box sx={{ display: "flex", mb: 1, gap: 1, alignItems: "center" }}>
        <Skeleton variant="circular" width={60} height={60} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 1,
          }}
        >
          <Skeleton variant="rectangular" width={"100%"} height={18} />
          <Skeleton variant="rectangular" width={"100%"} height={18} />
          <Skeleton variant="rectangular" width={"100%"} height={18} />
        </Box>
      </Box>
    );
  return (
    <Box sx={{ display: "flex", mb: 1, gap: 1, alignItems: "center" }}>
      <UserImage userId={user._id} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold" }}
        >{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography
          sx={{ color: theme.palette.neutral.main }}
        >{`${user.occupation}, ${user.location}`}</Typography>
      </Box>
      <Typography sx={{ fontSize: 10 }}>
        Sent at {createdAtMoment.format("HH:mm DD.MM.YYYY")}
      </Typography>
      {toBeHandled && (
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={() => handleAcceptRequest(true)}>
            <Check />
          </IconButton>
          <IconButton onClick={() => handleAcceptRequest(false)}>
            <Close />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default FriendItem;
