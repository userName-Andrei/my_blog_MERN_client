import { Stack, Typography } from '@mui/material';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import AddComment from '../../components/AddComment';
import CommentBlock from '../../components/CommentBlock';
import ReactMarkdown from 'react-markdown';
import Post from '../../components/Post';
import axios from '../../utils/axios';
import dateFixer from '../../utils/dateFixer';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthChecker } from '../../store/slices/authSlice';
import { fetchCommentsByPostId } from '../../store/slices/postSlice';

const FullPost = () => {
    const dispatch = useDispatch();
    const [post, setPost] = useState({item: {}, status: 'loading'});
    const comments = useSelector(state => state.posts.comments);
    const postId = useParams().id;
    const isAuth = useSelector(isAuthChecker);
    const userData = useSelector(state => state.auth.user);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`/posts/${postId}`)

            setPost(state => ({
                item: response.data,
                status: 'loaded'
            }))
        } catch (error) {
            setPost(state => ({
                ...state,
                status: 'error'
            }))
        }
    }

    useEffect(() => {
        fetchPost()
        dispatch(fetchCommentsByPostId(postId))
    }, []);

    return (
        <Stack mt={10} mb={4}>
            <Post 
                user={post.item.author} 
                image={post.item.previewUrl}
                postDate={dateFixer(post.item.createdAt)}
                title={post.item.title}
                tags={post.item.tags}
                text={<ReactMarkdown children={post.item.text} />}
                views={post.item.viewsCount}
                comments={post.item.commentCount}
                isLoading={post.status === 'loading'}
                isFullPost
            />
            <CommentBlock comments={comments.items} isLoading={comments.status === 'loading'}/>
            {comments.status === 'error' && <Typography variant='body1' color='error' ml={2} mb={2}>Произошла ошибка, попробуйте перезагрузить страницу</Typography>}
            {isAuth && <AddComment user={userData}/>}
        </Stack>
    );
};

export default FullPost;