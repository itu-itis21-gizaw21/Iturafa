import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode : "light",
    user : null,
    token : null,
    posts: []
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setPosts : (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            state.posts.unshift(action.payload)
        },
        addPost: (state, action) => {
          
            const updatedPosts = state.posts.map((post) => {
                if (post?._id === action.payload.post?._id) return action.payload.post;
                return post;
              });
              state.posts = updatedPosts;
            },
          },
});

export const fetchPosts = () => async (dispatch) => {
    try {
        const response = await fetch("/api/posts");
        const posts = await response.json();
        dispatch(setPosts({ posts }));
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

export const fetchPostsN = () => async (dispatch) => {
    try {
        const response = await fetch("/api/posts/new");
        const posts = await response.json();
        dispatch(setPosts({ posts }));
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

export const { setPosts, setPost, addPost, setMode } = postSlice.actions;
export default postSlice.reducer