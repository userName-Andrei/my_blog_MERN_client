import { Stack, Typography } from '@mui/material';
import {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import AddComment from '../../components/AddComment';
import CommentBlock from '../../components/CommentBlock';
import ReactMarkdown from 'react-markdown';
import Post from '../../components/Post';
import dateFixer from '../../utils/dateFixer';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthChecker } from '../../store/slices/authSlice';
import { clearPosts, fetchCommentsByPostId, fetchPostByPostId } from '../../store/slices/postSlice';

const FullPost = () => {
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts.posts.items[0]);
    const postStatus = useSelector(state => ({name: state.posts.posts.status, message: state.posts.posts.errorMessage}));
    const comments = useSelector(state => state.posts.comments);
    const postId = useParams().id;
    const isAuth = useSelector(isAuthChecker);
    const userData = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(clearPosts())
        dispatch(fetchPostByPostId(postId))
        dispatch(fetchCommentsByPostId(postId))
    }, []);

    const renderPost = (post, postStatus) => {
        if (postStatus.name === 'error') {
            return (
                <Typography 
                    variant='h4' 
                    color='error' 
                    textAlign='center'
                    gutterBottom
                >
                    {postStatus.message || 'Произошла ошибка! Попробуйте обновить страницу.'}
                </Typography>
            )
        }

        if (postStatus.name === 'loading') {
            return (
                <Post 
                    isLoading={postStatus.name === 'loading'}
                    isFullPost
                />
            )
        }

        return (
            <Post 
                user={post.author} 
                image={post.previewUrl}
                postDate={dateFixer(post.createdAt)}
                title={post.title}
                tags={post.tags}
                text={<ReactMarkdown children={post.text} />}
                views={post.viewsCount}
                comments={post.commentCount}
                isFullPost
            /> 
        )
    }

    return (
        <Stack mt={10} mb={4}>
            {renderPost(post, postStatus)}
            {postStatus.name !== 'error' && <>
                <CommentBlock comments={comments.items} isLoading={comments.status === 'loading'}/>
                {comments.status === 'error' && <Typography variant='body1' color='error' ml={2} mb={2}>Произошла ошибка, попробуйте перезагрузить страницу</Typography>}
                {isAuth && <AddComment user={userData}/>}
            </>}
        </Stack>
    );
};

export default FullPost;