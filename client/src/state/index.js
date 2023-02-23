import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  posts: [],
  community: null,
  myCommunities: [],
  allCommunities: [],
  categories: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.token);
    },
    editUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
      localStorage.setItem("accessToken", null);
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("User friends non-existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setCommunities: (state, action) => {
      if (action.payload.type === "join")
        state.myCommunities.push(action.payload.community);
      if (action.payload.type === "leave")
        state.myCommunities = state.myCommunities.filter(
          (item) => item._id !== action.payload.community._id
        );
    },
    setCommunitiesFromApi: (state, action) => {
      state.myCommunities = action.payload;
    },
    setAllCommunities: (state, action) => {
      state.allCommunities = action.payload;
    },
    createCommunity: (state, action) => {
      state.allCommunities.push(action.payload);
    },
    setCommunityDetail: (state, action) => {
      state.community = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});
export const {
  setMode,
  setLogin,
  addPost,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setCommunities,
  setCommunitiesFromApi,
  setAllCommunities,
  createCommunity,
  setCommunityDetail,
  setCategories,
  editUser,
} = authSlice.actions;
export default authSlice.reducer;
