import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from '../../utils/axios';

import UserData from '../UserData';
import SkeletonPost from './Skeleton';

import { 
    Box, 
    Card, 
    CardContent,
    CardMedia, 
    IconButton, 
    Stack, 
    Typography, 
    useTheme 
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import classes from './Post.module.scss';
import { removePost } from '../../store/slices/postSlice';

const Post = ({
    id,
    user, 
    image, 
    postDate, 
    title, 
    text,
    tags,
    views,
    comments, 
    isLoading,
    isEditable,
    isFullPost
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const textSlicer = (text, limit) => {
        if (text.length > limit) {
            text = text.slice(0, limit).split(' ');
            return text.slice(0, text.length - 1).join(' ') + '...';
        }
        
        return text;
    }

    const deletePost = async (postId) => {
        try {
            await axios.delete(`/posts/${postId}`)

            dispatch(removePost(postId))
        } catch (error) {
            console.warn('Не удалось удалить статью!',error)
        }
    }

    if (isLoading) {
        return <SkeletonPost />
    }
    
    return (
            <Card 
                variant='outlined'
                className={!isFullPost ? classes.root : null}
                sx={isFullPost && {border: 'none'}}
            >
                {isEditable ? (
                    <Box className={classes.editButtons}>
                        <IconButton color="primary">
                            <Link to={`/posts/${id}/edit`}>
                                <EditIcon />
                            </Link>
                        </IconButton>
                        <IconButton 
                            color="secondary"
                            onClick={() => deletePost(id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ) : null}
                <UserData 
                    user={user}
                    postDate={postDate} 
                />
                <Stack 
                    direction="row"
                    sx={{
                        position: 'relative',
                        height: isFullPost ? '40vh' : '200px',
                        alignItems: 'flex-end'
                    }}
                >
                    <Typography 
                        variant='h4' 
                        color={theme.palette.common.white}
                        sx={{
                            position: "relative",
                            zIndex: 5,
                            ml: 2,
                            mb: 1
                        }}
                    >
                        {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
                    </Typography>
                    <CardMedia 
                        image={image}
                        component='img'
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                    />
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.3)'
                        }} 
                    />
                </Stack>
                <CardContent>
                    <Typography mb={1}>
                        {isFullPost ? text : <Link to={`/posts/${id}`}>{textSlicer(text, 100)}</Link>}
                    </Typography>
                    <Stack direction='row' spacing={1}>
                        {tags.map((tag, i) => (
                            <Typography 
                                variant='overline' 
                                mb={1} 
                                key={i} 
                                color='secondary'
                            >
                                <Link to={`/posts/tags/${tag}`}>
                                    #{tag}
                                </Link>
                            </Typography>
                        ))}
                    </Stack>
                        <Stack
                            direction='row'
                        >
                            <Stack
                                direction='row'
                                alignItems='center'
                                mr={2}
                            >
                                <VisibilityIcon sx={{mr: 1}} color='secondary' />
                                <Typography variant='subtitle' color='secondary'>{views}</Typography>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                            >
                                <CommentIcon sx={{mr: 1}} color='secondary' />
                                <Typography variant='subtitle' color='secondary'>{comments || 0}</Typography>
                            </Stack>
                        </Stack>
                </CardContent>
            </Card>
    );
};

export default Post;