import { Settings as SettingsIcon } from "@mui/icons-material";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import FlexBetween from "components/FlexBetween";
import Icon from "components/Icon";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditCommunity from "./EditCommunity";

const CommunityDetailWidget = () => {
  const { icon, owner, name, createdAt, users, description, _id } = useSelector(
    (state) => state.community
  );
  const userId = useSelector((state) => state.user._id);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  const [edit, setEdit] = useState(false);
  const numberOfParticipants = users.length;
  useEffect(() => {
    async function getAdmin() {
      const request = await getRequest(api.users.getUserById(owner));
      if (request) setAdmin(request);
    }
    getAdmin();
  }, [owner]);
  const formatedCreatedAt = moment(createdAt).format("Do MMM YYYY");
  const hasPermissionToEdit = owner === userId;

  function handleEdit() {
    setEdit(!edit);
  }

  const Admin = () => {
    if (!admin) return <div />;
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <UserImage
          image={admin.picturePath}
          userId={admin.userId}
          size={"24px"}
        />
        <Typography
          onClick={() => navigate(`/profile/${admin._id}`)}
          color={dark}
          fontWeight="500"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          {admin.firstName} {admin.lastName}
        </Typography>
      </Box>
    );
  };
  const Description = ({ description }) => {
    const [more, setMore] = useState(false);
    function sliceText() {
      if (!more) return description.slice(0, 300) + "...";
      if (more) return description;
    }
    return (
      <Box sx={{ overflow: "auto", maxHeight: "32vh" }}>
        <Typography variant="h6">About</Typography>
        <Typography>{sliceText()}</Typography>
        <Typography
          onClick={() => setMore(!more)}
          sx={{
            fontWeight: "bold",
            color: palette.neutral.medium,
            fontSize: "12px",
            "&:hover": {
              cursor: "pointer",
              color: palette.neutral.dark,
              transition: "color 0.5s",
            },
          }}
        >
          {!more ? "Show more" : "Hide"}
        </Typography>
      </Box>
    );
  };

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Box sx={{ display: "flex", alignItems: "flex-end", py: "0.5rem" }}>
          <Icon name={icon} fontSize={"large"} sx={{ mr: 2 }} />
          <Typography variant="h4">{name}</Typography>
        </Box>{" "}
        {hasPermissionToEdit && (
          <Button endIcon={<SettingsIcon />} onClick={handleEdit}>
            Edit
          </Button>
        )}
      </FlexBetween>
      <Divider />
      <Typography>Number of participants: {numberOfParticipants}</Typography>
      <Typography>Created on {formatedCreatedAt}</Typography>
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        Admin:
        <Admin />
      </Box>
      <Divider />
      <Description description={description} />

      <EditCommunity
        open={edit}
        handleClose={handleEdit}
        users={users}
        userId={userId}
        communityId={_id}
      />
    </WidgetWrapper>
  );
};

export default CommunityDetailWidget;
