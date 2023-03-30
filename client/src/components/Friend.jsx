import { PersonAdd, PersonOff } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  addRemoveFriends,
}) => {
  const navigate = useNavigate();
  const { _id, ...user } = useSelector((state) => state.user);

  const { palette } = useTheme();

  const isNotMe = _id !== friendId;
  const specificId = isNotMe ? friendId : _id;
  const isFriend = user.friends.includes(friendId);

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" userId={specificId} />
        <Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography
              onClick={() => {
                navigate(`/profile/${friendId}`);
              }}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
          </Box>
          <Typography fontSize="0.75rem">{subtitle}</Typography>
        </Box>
      </FlexBetween>
      {isNotMe && (
        <IconButton onClick={addRemoveFriends}>
          {!isFriend ? <PersonOff /> : <PersonAdd />}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
