import { Person as PersonIcon, PersonAddOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { getRequest, postRequest } from "api";
import { api } from "api/routes";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function FriendsSuggestions({ userId, communityId, empty }) {
  const { palette } = useTheme();
  const primaryDark = palette.primary.light;
  const user = useSelector((state) => state.user);
  const reduxRequests = useSelector((state) => state.friendRequests);

  const [suggestions, setSuggestions] = useState([]);
  const [added, setAdded] = useState([]);

  async function addFriend(friendId, friendFirstName, friendLastName) {
    try {
      const request = await postRequest(api.users.sendFriendRequest, {
        fromUserId: user._id,
        fromUserFirstName: user.firstName,
        fromUserLastName: user.lastName,
        toUserId: friendId,
        toUserFirstName: friendFirstName,
        toUserLastName: friendLastName,
      });
      if (request) {
        setAdded([...added, request.toUserId]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getUserFriends() {
      const request = await getRequest(
        api.users.getFriendsSuggestions(userId, communityId)
      );
      if (request) setSuggestions(request);
    }
    async function getFriendRequests() {
      const request = await getRequest(
        api.users.getPendingFriendRequests(userId)
      );
      if (request) setAdded(request.map((item) => item.toUserId));
    }
    getFriendRequests();
    getUserFriends();
  }, [communityId, userId, reduxRequests]);
  function filterSuggestionsByAdded() {
    let array = suggestions;
    array = array.filter((arr) =>
      reduxRequests.find((req) => req.fromUserId !== arr._id)
    );
    return array.filter((item) => !added.includes(item._id)).slice(0, 3);
  }

  if (filterSuggestionsByAdded().length === 0) {
    if (empty)
      return (
        <WidgetWrapper overflow="auto">
          <Typography variant="h4">Friends suggestions</Typography>
          <Typography variant="subtitle1">No friend suggesstions</Typography>
        </WidgetWrapper>
      );
    return <div />;
  }
  return (
    <WidgetWrapper overflow="auto">
      <Typography variant="h4">Friends suggestions</Typography>
      <List>
        {filterSuggestionsByAdded().map(
          ({ firstName, lastName, picturePath, mutualFriends, _id }, key) => (
            <ListItem key={key}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <FlexBetween>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box mr="1rem">
                      {picturePath ? (
                        <UserImage
                          image={picturePath}
                          size="20px"
                          userId={_id}
                        />
                      ) : (
                        <PersonIcon sx={{ fontSize: "20px" }} />
                      )}
                    </Box>
                    <Box
                      sx={{
                        "&:hover": {
                          color: palette.primary.main,
                          cursor: "pointer",
                          transition: "color 0.5s",
                        },
                      }}
                    >
                      <Typography>{`${firstName} ${lastName}`}</Typography>
                      <Typography fontSize={12} color={palette.neutral.dark}>
                        {mutualFriends.length} mutual friends
                      </Typography>
                    </Box>
                  </Box>
                </FlexBetween>
                <IconButton
                  onClick={() => addFriend(_id, firstName, lastName)}
                  sx={{}}
                  size="small"
                >
                  <PersonAddOutlined sx={{ color: primaryDark }} size="small" />
                </IconButton>
              </Box>
            </ListItem>
          )
        )}
      </List>
    </WidgetWrapper>
  );
}

export default FriendsSuggestions;
