import {
  ManageAccountsOutlined,
  // EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  PersonOff,
  PersonAdd,
  PeopleAlt,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest, patchRequest, postRequest } from "api";
import { api } from "api/routes";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "scenes/profilePage/EditProfile";
import { setFriends } from "state";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const userRedux = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isMyProfile = userId === userRedux._id;
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [editProfile, setEditProfile] = useState(false);
  const isFriend = userRedux.friends.includes(userId);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (isMyProfile) {
      setUser(userRedux);
    }
    const getUser = async () => {
      const response = await getRequest(api.users.getUserById(userId));
      if (response) setUser(response);
    };
    getUser();
  }, [userId, isMyProfile, userRedux]);

  if (!user) {
    return null;
  }

  const removeFriend = async () => {
    const request = await patchRequest(
      api.users.addRemoveFriend(userRedux._id, userId)
    );
    dispatch(setFriends(request));
  };
  async function addFriend() {
    try {
      await postRequest(api.users.sendFriendRequest, {
        fromUserId: userRedux._id,
        fromUserFirstName: userRedux.firstName,
        fromUserLastName: userRedux.lastName,
        toUserId: user._id,
        toUserFirstName: user.firstName,
        toUserLastName: user.lastName,
      });
      setSent(true);
    } catch (err) {
      console.log(err);
    }
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    // friends,
  } = user;

  return (
    <WidgetWrapper>
      <EditProfile
        open={editProfile}
        handleClose={() => setEditProfile(false)}
      />
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} userId={userId} />
          <Typography
            onClick={() => navigate(`/profile/${userId}`)}
            variant="h4"
            color={dark}
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {firstName} {lastName}
          </Typography>
        </FlexBetween>
        {isMyProfile ? (
          <ManageAccountsOutlined
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: medium,
              },
            }}
            onClick={() => setEditProfile(true)}
          />
        ) : isFriend ? (
          <IconButton onClick={removeFriend}>
            <PersonOff />
          </IconButton>
        ) : !sent ? (
          <IconButton onClick={addFriend}>
            <PersonAdd />
          </IconButton>
        ) : (
          <IconButton disabled>
            <PeopleAlt />
          </IconButton>
        )}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      {/* <Divider /> */}

      {/* THIRD ROW
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider /> */}

      {/* FOURTH ROW
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box> */}
    </WidgetWrapper>
  );
};

export default UserWidget;
