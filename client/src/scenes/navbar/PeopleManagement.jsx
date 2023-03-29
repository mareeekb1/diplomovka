import { People } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriendRequests } from "state";

const PeopleManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const requests = useSelector((state) => state.friendRequests);

  useEffect(() => {
    async function fetch() {
      const req = await getRequest(api.users.getFriendRequests(user._id));
      if (req) {
        dispatch(setFriendRequests(req));
      }
    }
    fetch();
  }, [dispatch, user._id]);

  return (
    <IconButton onClick={() => navigate("/people")}>
      <Badge badgeContent={requests ? requests.length : null} color="primary">
        <People sx={{ fontSize: "25px" }} />
      </Badge>
    </IconButton>
  );
};

export default PeopleManagement;
