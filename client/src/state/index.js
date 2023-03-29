import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  posts: [],
  community: null,
  myCommunities: [],
  allCommunities: [],
  categories: [],
  friendRequests: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // GENERAL
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // USER
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
        state.user.friends = action.payload;
      } else {
        console.log("User friends non-existent");
      }
    },
    // POSTS
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
    // COMMUNITIES
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
      state.myCommunities.push(action.payload);
    },
    setCommunityDetail: (state, action) => {
      state.community = action.payload;
    },
    // CATEGORIES
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    //CONVERSATIONS
    setConversations: (state, action) => {
      state.user.conversations = action.payload.map((item) => {
        const { newMessage, open, toggled } = item;
        return {
          newMessage: Boolean(newMessage),
          open: Boolean(open),
          toggled: Boolean(toggled),
          ...item,
        };
      });
    },
    setSingleConversation: (state, action) => {
      const { index, field, value } = action.payload;
      state.user.conversations[index][field] = value;
    },
    addMessage: (state, action) => {
      const { id, message } = action.payload;
      const index = state.user.conversations.findIndex(
        (item) => item._id === id
      );
      if (index >= 0) {
        state.user.conversations[index].messages.unshift(message);
      }
    },
    // FRIEND REQUESTS
    setFriendRequests: (state, action) => {
      state.friendRequests = action.payload;
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
  setConversations,
  setSingleConversation,
  addMessage,
  setFriendRequests,
} = authSlice.actions;
export default authSlice.reducer;
