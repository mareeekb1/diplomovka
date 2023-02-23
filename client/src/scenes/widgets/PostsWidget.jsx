import { getRequest } from "api";
import { api } from "api/routes";
import Loader from "components/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ isProfile = false, communityId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const userId = useSelector((state) => state.user._id)

  async function getPosts() {
    let url = ''
    if (communityId) {
      url = api.posts.communityPosts(communityId)
    } else {
      url = api.posts.default(userId)
    }
    const request = await getRequest(url)
    dispatch(setPosts(request))
  }

  async function getUserPosts() {
    const request = await getRequest(api.posts.userPosts(userId))
    dispatch(setPosts(request))
  }


  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!posts) return <Loader />

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }, key) => (
          <PostWidget
            key={key}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
