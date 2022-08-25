import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios';

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
    comments: {
        items: [],
        status: 'loading'
    },
    newComment: {
        comment: {},
        status: 'waiting'
    }
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({params}) => {
        const posts = await axios.get(
            '/posts',
            {params}
        )

        return posts.data;
    }
);

export const fetchPostsByTag = createAsyncThunk(
    'posts/fetchPostsByTag',
    async ({params, tag}) => {
        const posts = await axios.get(
            `/posts/tags/${tag}`,
            {params}
        )

        return posts.data;
    }
);

export const fetchTags = createAsyncThunk(
    'posts/fetchTags',
    async () => {
        const tags = await axios.get('/posts/tags/all')

        return tags.data;
    }
);

export const fetchComments = createAsyncThunk(
    'posts/fetchComments',
    async ({params}) => {
        const comments = await axios.get(
            '/comments',
            {params}
        )

        return comments.data;
    }
);

export const fetchCommentsByPostId = createAsyncThunk(
    'posts/fetchCommentsByPostId',
    async (postId) => {
        const comments = await axios.get(`/comments/${postId}`)

        return comments.data;
    }
);

export const createComment = createAsyncThunk(
    'posts/createComment',
    async ({postId, comment, author}) => {
        const comments = await axios.post(
            `/comments/${postId}`,
            comment
        )

        return ({...comments.data, author});
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        'clearPosts': (state) => {
            state.posts.items = [];
        },
        'removePost': (state, action) => {
            state.posts.items = state.posts.items.filter(post => post._id !== action.payload);
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            if (action.payload.length === 0) {
                state.posts.status = 'posts over';
            } else {
                state.posts.items = [...state.posts.items, ...action.payload];
                state.posts.status = 'loaded';
            }
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchPostsByTag.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [fetchPostsByTag.fulfilled]: (state, action) => {
            if (action.payload.length === 0) {
                state.posts.status = 'posts over';
            } else {
                state.posts.items = [...state.posts.items, ...action.payload];
                state.posts.status = 'loaded';
            }
        },
        [fetchPostsByTag.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload.slice(0, 5);
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        [fetchComments.pending]: (state) => {
            state.comments.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload;
            state.comments.status = 'loaded';
        },
        [fetchComments.rejected]: (state) => {
            state.comments.items = [];
            state.comments.status = 'error';
        },
        [fetchCommentsByPostId.pending]: (state) => {
            state.comments.status = 'loading';
        },
        [fetchCommentsByPostId.fulfilled]: (state, action) => {
            state.comments.items = action.payload;
            state.comments.status = 'loaded';
        },
        [fetchCommentsByPostId.rejected]: (state) => {
            state.comments.items = [];
            state.comments.status = 'error';
        },
        [createComment.pending]: (state) => {
            state.newComment.status = 'loading';
        },
        [createComment.fulfilled]: (state, action) => {
            state.comments.items = [];
            state.comments.items.push(action.payload);
            state.newComment.status = 'loaded';
        },
        [createComment.rejected]: (state) => {
            state.newComment.status = 'error';
        }
    }
});

export const {clearPosts, removePost} = postSlice.actions;

export default postSlice.reducer;