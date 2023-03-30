import {
  ChatBubbleOutlineOutlined,
  Facebook,
  Twitter,
  LinkedIn,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { patchRequest } from "api";
import { api } from "api/routes";
import UserImage from "components/UserImage";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUser = useSelector((state) => state.user);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [openMenu, setOpenMenu] = useState(null);
  const [giveLike, setGivenLike] = useState(isLiked);
  const [givenLikes, setGivenLikes] = useState(likeCount);
  const [newComment, setNewComment] = useState("");
  const [commentsState, setCommentsState] = useState(comments);
  const navigate = useNavigate();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const open = Boolean(openMenu);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    if (giveLike) {
      setGivenLikes(givenLikes - 1);
    } else {
      setGivenLikes(givenLikes + 1);
    }
    setGivenLike(!giveLike);
  };

  const patchComment = async () => {
    const request = await patchRequest(api.posts.patchComment(postId), {
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      userId: loggedInUser._id,
      comment: newComment,
      createdOn: moment().format("YYYY-MM-DD HH:mm"),
    });
    setCommentsState(comments.concat(request));
    setNewComment("");
  };

  function handleClose() {
    setOpenMenu(null);
  }
  function handleClick(event) {
    setOpenMenu(event.currentTarget);
  }
  function convertDate(date) {
    const momentDate = moment(date).format("HH:mm DD.MM.YYYY");
    return momentDate;
  }
  const urlLink = `http://localhost:3000/profile/${postUserId}`;
  return (
    <WidgetWrapper mt="4px">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {giveLike ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{givenLikes}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <Menu
          anchorEl={openMenu}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <FacebookShareButton url={urlLink}>
            <MenuItem>
              <Facebook />
            </MenuItem>
          </FacebookShareButton>
          <LinkedinShareButton url={urlLink}>
            <MenuItem>
              <LinkedIn />
            </MenuItem>
          </LinkedinShareButton>
          <TwitterShareButton url={urlLink}>
            <MenuItem>
              <Twitter />
            </MenuItem>
          </TwitterShareButton>
        </Menu>
        <IconButton
          onClick={handleClick}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box gap={1}>
          <TextField
            sx={{ mb: 1 }}
            fullWidth
            variant="standard"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            placeholder="Write a comment here"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                return setNewComment(newComment + "\n");
              }
              if (e.key === "Enter" && !e.shiftKey) {
                return patchComment();
              }
            }}
          />
          {commentsState.map((comment, i) => (
            <Box
              key={`${name}-${i}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                border: `1px solid ${palette.neutral.light}`,
                padding: "0.2rem 0.75rem",
                borderRadius: 2,
              }}
            >
              <FlexBetween>
                <Box display={"flex"} gap={1}>
                  <UserImage userId={comment.userId} size="20px" />
                  <Typography
                    onClick={() => {
                      navigate(`/profile/${comment.userId}`);
                    }}
                    sx={{
                      "&:hover": {
                        color: palette.primary.main,
                        cursor: "pointer",
                      },
                    }}
                  >{`${comment.firstName} ${comment.lastName}`}</Typography>
                </Box>
                <Typography fontSize="12px">
                  {convertDate(comment.createdOn)}
                </Typography>
              </FlexBetween>
              <Typography sx={{ color: main }}>{comment.comment}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
