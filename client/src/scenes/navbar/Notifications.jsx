import { Badge, IconButton } from "@mui/material";
import { Notifications as NotificationIcon } from "@mui/icons-material";
import React from "react";

const Notifications = () => {
  return (
    <IconButton onClick={() => console.log("notifications")}>
      <Badge badgeContent={4} color="primary">
        <NotificationIcon sx={{ fontSize: "25px" }} />
      </Badge>
    </IconButton>
  );
};

export default Notifications;
