import { getRequest } from "api";
import { api } from "api/routes";
import Loader from "components/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ isProfile = false, communityId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const userId = useSelector((state) => state.user._id);
  const [loading, setLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState(posts);
  const location = useLocation();

  useEffect(() => {
    async function getPosts() {
      setLoading(true);
      let url = "";
      if (isProfile) {
        url = api.posts.userPosts(userId);
      } else if (communityId) {
        url = api.posts.communityPosts(communityId);
      } else {
        url = api.posts.default(userId);
      }
      const request = await getRequest(url);
      if (request) {
        setLoadedPosts(request);
        dispatch(setPosts(request));
        setLoading(false);
      }
    }
    getPosts();
  }, [dispatch, location]);

  if (loading) return <Loader />;

  return (
    <>
      {loadedPosts.map(
        (
          {
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
          },
          key
        ) => (
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
