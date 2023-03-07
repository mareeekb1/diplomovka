import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = localStorage.getItem("accessToken");
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryDark = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const isNotMe = _id !== friendId;
  const specificId = isNotMe ? friendId : _id;

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends(data));
  };

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
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            {isNotMe && (
              <Box>
                {isFriend ? (
                  <PersonRemoveOutlined
                    sx={{
                      color: primaryDark,
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                    onClick={() => patchFriend()}
                  />
                ) : (
                  <PersonAddOutlined
                    sx={{
                      color: primaryDark,
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                    onClick={() => patchFriend()}
                  />
                )}
              </Box>
            )}
          </Box>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;
