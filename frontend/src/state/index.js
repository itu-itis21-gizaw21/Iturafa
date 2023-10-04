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
        addPostL: (state, action) => {
            
            const updatedPost = action.payload.post;
            const index = state.posts.findIndex(post => post?._id === updatedPost?._id);
          
            if (index !== -1) {
              state.posts[index] = updatedPost;
            } else {
              state.posts.push(updatedPost);
            }
          },
    },
});

export const fetchPosts = (page) => async (dispatch) => {
    try {
        const response = await fetch(`/api/posts/posts?page=${page}`);
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

export const fetchPostsH = () => async (dispatch) => {
    try {
        const response = await fetch("/api/posts/hidden");
        const posts = await response.json();
        dispatch(setPosts({ posts }));
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

export const { setPosts, setPost, addPost, setMode, addPostL } = postSlice.actions;
export default postSlice.reducer
