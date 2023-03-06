const URL = process.env.PROXY || "http://localhost:3001/";
export const api = {
  category: {
    get: URL + "category",
    create: URL + "category/create",
    delete: (id) => `${URL}category/${id}/delete`,
  },
  users: {
    getUserById: (id) => `${URL}users/${id}`,
    getUserImage: (id) => `${URL}users/${id}/picture`,
    getFriendsSuggestions: (userId, communityId) =>
      `${URL}users/${userId}/${communityId}`,
    addRemoveFriend: (userId, friendId) => `${URL}users/${userId}/${friendId}`,
    editProfile: `${URL}users/edit`,
    getFriends: (id) => `${URL}users/${id}/friends`,
  },
  posts: {
    patchLike: (id) => `${URL}posts/${id}/like`,
    default: (id) => `${URL}posts/${id}`,
    communityPosts: (id) => `${URL}posts/${id}/comumnityPosts`,
    userPosts: (id) => `${URL}posts/${id}/userPosts`,
  },
  community: {
    default: URL + "community",
    getByCategoryId: (id) => `${URL}community/${id}`,
    getByCommunityId: (id) => `${URL}community/${id}/detail`,
    joinCommunity: (id) => `${URL}community/${id}/join`,
    getByUserId: (id) => `${URL}community/${id}/user`,
    create: URL + "community/create",
    edit: (id) => `${URL}community/${id}/edit`,
  },
};
