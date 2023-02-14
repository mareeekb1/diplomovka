const URL = process.env.PROXY || "http://localhost:3001/";
export const api = {
  category: {
    get: URL + "category",
    create: URL + "category/create",
    delete: (id) => `${URL}category/${id}/delete`,
  },
  users: {
    getUserById: (id) => `${URL}users/${id}`,
  },
  posts: {
    patchLike: (id) => `${URL}posts/${id}/like`,
    default: URL + "post",
  },
  community: {
    default: URL + "community",
    getByCategoryId: (id) => `${URL}community/${id}`,
    joinCommunity: (id) => `${URL}community/${id}/join`,
    getByUserId: (id) => `${URL}community/${id}/user`,
    create: URL + "community/create",
  },
};
