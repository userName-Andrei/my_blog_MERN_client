import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios';

const initialState = {
    posts: {
        items: [],
        status: 'loading',
        errorMessage: ''
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
    async ({params}, {rejectWithValue}) => {
        try {
            const posts = await axios.get(
                '/posts',
                {params}
            )
    
            return posts.data;
        } catch (error) {
            if (error.request.status === 404) {
                return rejectWithValue(error.response.data.message)
            }
            throw error
        }
    }
);

export const fetchPostsByTag = createAsyncThunk(
    'posts/fetchPostsByTag',
    async ({params, tag}, {rejectWithValue}) => {
        try {
            const posts = await axios.get(
                `/posts/tags/${tag}`,
                {params}
            )
    
            return posts.data;
        } catch (error) {
            if (error.request.status === 404) {
                return rejectWithValue(error.response.data.message)
            }
            throw error
        }
    }
);

export const fetchPostByPostId = createAsyncThunk(
    'posts/fetchPostByPostId',
    async (postId, {rejectWithValue}) => {
        try {
            const posts = await axios.get(`/posts/${postId}`)

            return posts.data;
        } catch (error) {
            if (error.request.status === 404) {
                return rejectWithValue(error.response.data.message)
            }
            throw error
        }
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (data) => {
        const post = await axios.post('/posts', data)

        return post.data;
    }
);

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({postId, data}) => {
        const post = await axios.put(`/posts/${postId}`, data)

        return post.data;
    }
);

export const fetchTags = createAsyncThunk(
    'posts/fetchTags',
    async (_, {rejectWithValue}) => {
        try {
            const tags = await axios.get('/posts/tags/all')

            return tags.data;
        } catch (error) {
            if (error.request.status === 404) {
                return rejectWithValue(error.response.data.message)
            }
            throw error
        }
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
            state.posts.status = 'loading';
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
        [fetchPosts.rejected]: (state, action) => {
            state.posts.items = [];
            state.posts.status = 'error';
            state.posts.errorMessage = action.payload;
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
        [fetchPostsByTag.rejected]: (state, action) => {
            state.posts.items = [];
            state.posts.status = 'error';
            state.posts.errorMessage = action.payload;
        },
        [fetchPostByPostId.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [fetchPostByPostId.fulfilled]: (state, action) => {
            state.posts.items = [action.payload];
            state.posts.status = 'loaded';
        },
        [fetchPostByPostId.rejected]: (state, action) => {
            state.posts.status = 'error';
            state.posts.errorMessage = action.payload;
        },
        [createPost.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [createPost.fulfilled]: (state, action) => {
            state.posts.items = [action.payload];
            state.posts.status = 'loaded';
        },
        [createPost.rejected]: (state) => {
            state.posts.status = 'error';
        },
        [updatePost.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [updatePost.fulfilled]: (state, action) => {
            state.posts.items = [action.payload];
            state.posts.status = 'loaded';
        },
        [updatePost.rejected]: (state) => {
            state.posts.status = 'error';
        },
        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload.slice(0, 5);
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.items = [];
            state.tags.status = 'error';
            state.posts.errorMessage = action.payload;
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