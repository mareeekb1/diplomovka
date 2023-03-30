import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { Notifications as NotificationIcon } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { getRequest, patchRequest } from "api";
import { api } from "api/routes";
import { useSelector } from "react-redux";
import UserImage from "components/UserImage";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const userId = useSelector((state) => state.user._id);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(null);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    async function fetchNotifications() {
      const request = await getRequest(api.notification.get(userId));
      setNotifications(request);
    }
    fetchNotifications();
  }, [userId]);

  const numberOfNotifications = notifications
    ? notifications.filter((item) => !item.seen).length
    : 0;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigateTo = (action, type, id) => async () => {
    console.log(action, type);
    await patchRequest(api.notification.seen(id));
    navigate(`/${type}/${action}`);
    setNotifications((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={numberOfNotifications} color="primary">
          <NotificationIcon sx={{ fontSize: "25px" }} />
        </Badge>
      </IconButton>
      {notifications && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {notifications.map(
            (
              {
                seen,
                senderName,
                senderLastName,
                text,
                senderId,
                createdAt,
                action,
                type,
                _id,
              },
              key
            ) => (
              <MenuItem
                key={key}
                sx={{
                  gap: 1,
                  background: !seen ? theme.palette.primary.dark : "",
                  "&:hover": {
                    background: theme.palette.primary.main,
                  },
                }}
                onClick={navigateTo(action, type, _id)}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <UserImage userId={senderId} size="20px" />
                  <Typography>
                    {senderName} {senderLastName} {text}
                  </Typography>
                </Box>
                <Typography color={"GrayText"}>
                  {moment(createdAt).format("HH:mm DD.MM.YYYY")}
                </Typography>
              </MenuItem>
            )
          )}
        </Menu>
      )}
    </>
  );
};

export default Notifications;
