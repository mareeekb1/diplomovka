import { Box, Typography, useTheme } from "@mui/material";
import { getRequest, patchRequest } from "api";
import { api } from "api/routes";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useSelector((state) => state.user.friends);

  useEffect(() => {
    const getFriends = async () => {
      const response = await getRequest(api.users.getFriends(userId));
      dispatch(setFriends(response));
    };
    getFriends();
  }, [userId, dispatch]);

  const addRemoveFriends = (friendId) => async () => {
    const request = await patchRequest(
      api.users.addRemoveFriend(userId, friendId)
    );
    dispatch(setFriends(request));
  };

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend, key) => (
          <Friend
            key={key}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
            addRemoveFriends={addRemoveFriends(friend._id)}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
