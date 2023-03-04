import { Person as PersonIcon, PersonAddOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { getRequest, patchRequest } from "api";
import { api } from "api/routes";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFriends } from "state";

function FriendsSuggestions({ userId, communityId }) {
  const { palette } = useTheme();
  const primaryDark = palette.primary.light;

  const [suggestions, setSuggestions] = useState([]);
  const [added, setAdded] = useState([]);
  const dispatch = useDispatch;

  async function addFriend(friendId) {
    try {
      const response = await patchRequest(
        api.users.addRemoveFriend(userId, friendId)
      );
      if (response) {
        setAdded(response.map((item) => item._id));
        dispatch(setFriends(response));
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
    getUserFriends();
  }, [communityId, userId]);

  function filterSuggestionsByAdded() {
    return suggestions.filter((item) => !added.includes(item._id)).slice(0, 3);
  }
  if (filterSuggestionsByAdded().length === 0) {
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
                <IconButton onClick={() => addFriend(_id)} sx={{}} size="small">
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
