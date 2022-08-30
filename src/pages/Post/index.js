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
    const postStatus = useSelector(state => state.posts.posts.status);
    const comments = useSelector(state => state.posts.comments);
    const postId = useParams().id;
    const isAuth = useSelector(isAuthChecker);
    const userData = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(clearPosts())
        dispatch(fetchPostByPostId(postId))
        dispatch(fetchCommentsByPostId(postId))
    }, []);

    return (
        <Stack mt={10} mb={4}>
            {!post
            ?
                <Post 
                    isLoading={postStatus === 'loading'}
                    isFullPost
                />
            :
                <Post 
                    user={post.author} 
                    image={post.previewUrl}
                    postDate={dateFixer(post.createdAt)}
                    title={post.title}
                    tags={post.tags}
                    text={<ReactMarkdown children={post.text} />}
                    views={post.viewsCount}
                    comments={post.commentCount}
                    isLoading={postStatus === 'loading'}
                    isFullPost
                />
            }
            <CommentBlock comments={comments.items} isLoading={comments.status === 'loading'}/>
            {comments.status === 'error' && <Typography variant='body1' color='error' ml={2} mb={2}>Произошла ошибка, попробуйте перезагрузить страницу</Typography>}
            {isAuth && <AddComment user={userData}/>}
        </Stack>
    );
};

export default FullPost;