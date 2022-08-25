import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { 
    fetchPosts, 
    fetchTags, 
    fetchComments, 
    fetchPostsByTag, 
    clearPosts
} from '../../store/slices/postSlice';
import {useParams} from 'react-router-dom';

import {  
    Box,
    Button,
    Divider,
    Grid,
    Stack,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TagIcon from "@mui/icons-material/Tag";

import Post from '../../components/Post';
import TagBlock from '../../components/TagBlock';
import CommentBlock from '../../components/CommentBlock';
import dateFixer from '../../utils/dateFixer';

const Main = () => {
    const posts = useSelector(state => state.posts.posts);
    const tags = useSelector(state => state.posts.tags);
    const userId = useSelector(state => state.auth.user?._id);
    const comments = useSelector(state => state.posts.comments);
    const dispatch = useDispatch();

    const [newPostsLoading, setNewPostsLoading] = useState(true);
    const postLoading = posts.status !== 'loaded' && newPostsLoading;
    const tagLoading = tags.status !== 'loaded';
    const commentLoading = comments.status !== 'loaded';
    const param = useParams().tag;

    useEffect(() => {
        dispatch(clearPosts());
        getPosts();
        dispatch(fetchTags());
        dispatch(fetchComments({params: {limit: 5}}));
    }, [param]);

    const getPosts = (lastpost = 0, limit = 5) => {
        
        if (param) {
            dispatch(fetchPostsByTag({
                params: {lastpost, limit},
                tag: param
            }))

            return
        }

        dispatch(fetchPosts({
            params: {lastpost, limit}
        }))
    }

    const getNextPosts = (lastpost = posts.items.length) => {
        setNewPostsLoading(false);
        getPosts(lastpost);
    }

    return (
        <Box
            sx={{mt: 9, mb: 4}}
        >
            {
                param && <Stack
                    direction='row'
                    alignItems='center'
                    mb={2}
                >
                    <TagIcon fontSize='large'/>
                    <Typography 
                        variant='h4'
                    >
                        {param}
                    </Typography>
                </Stack>
            }
            <Grid 
                container 
                spacing={2}
                wrap='wrap-reverse'
            >
                <Grid item xs={12} sm={7} md={8}>
                    {(postLoading ? [...Array(5)] : posts.items).map((post, i) => (
                        postLoading 
                        ? (
                            <Post 
                                key={i}
                                isLoading={postLoading}
                            />
                        ) : (
                            <Post 
                                key={i}
                                id={post._id}
                                user={post.author} 
                                image={post.previewUrl}
                                postDate={dateFixer(post.createdAt)}
                                title={post.title}
                                tags={post.tags}
                                text={post.text}
                                views={post.viewsCount}
                                comments={post.commentCount || 0}
                                isLoading={postLoading}
                                isEditable={post.author._id === userId}
                            />
                        )
                        
                    ))}
                    <Stack
                        justifyContent="center"
                        direction="row"
                    >
                        <Button 
                            startIcon={<ExpandMoreIcon />}
                            variant='contained' 
                            color='secondary'
                            size='small'
                            disabled={posts.status === 'posts over' || postLoading}
                            onClick={() => getNextPosts()}
                        >
                            Ещё
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    <TagBlock tags={tags.items} isLoading={tagLoading} />
                    <Divider variant="fullWidth" sx={{my: 2, display: { xs: 'none', sm: 'block' }}}/>
                    <Box sx={{display: { xs: 'none', sm: 'block' }}}>
                        <CommentBlock  comments={comments.items} isLoading={commentLoading} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
        
    );
};

export default Main;