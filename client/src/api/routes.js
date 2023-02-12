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
};
