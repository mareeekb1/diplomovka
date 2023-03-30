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
    addRemoveFriend: (userId, friendId) =>
      `${URL}users/${userId}/${friendId}/add-remove`,
    editProfile: `${URL}users/edit`,
    getFriends: (id) => `${URL}users/${id}/friends`,
    getFriendRequests: (id) => `${URL}users/${id}/friend-request/get`,
    getPendingFriendRequests: (id) =>
      `${URL}users/${id}/friend-request/pending`,
    handleFriendRequest: `${URL}users/handlefriendrequest`,
    sendFriendRequest: `${URL}users/send-request`,
  },
  posts: {
    patchLike: (id) => `${URL}posts/${id}/like`,
    patchComment: (id) => `${URL}posts/${id}/comment`,
    default: (id) => `${URL}posts/${id}`,
    communityPosts: (id) => `${URL}posts/${id}/comumnityPosts`,
    userPosts: (id) => `${URL}posts/${id}/userPosts`,
    getSinglePost: (id) => `${URL}posts/${id}/singlePost`,
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
  general: {
    search: (search) => URL + "general/search/" + search,
  },
  conversation: {
    get: (id) => URL + "conversation/" + id,
    getUserConversations: (id) => `${URL}conversation/${id}/user`,
    create: URL + "conversation/create",
  },
  messages: {
    get: (id, from, to) => {
      let array = [];
      if (id) array.push(id);
      if ((from || from === 0) && to) {
        array.push(from);
        array.push(to);
      }
      return URL + "message/" + array.join("/");
    },
    send: URL + "message/send",
    read: URL + "message/read",
  },
  notification: {
    get: (id) => URL + "notification/" + id,
    seen: (id) => URL + "notification/" + id + "/seen",
  },
};
