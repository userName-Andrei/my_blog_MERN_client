import { 
    Avatar, 
    Box, 
    Card, 
    CardContent, 
    CardHeader, 
    CardMedia, 
    Grid, 
    IconButton, 
    Stack, 
    Typography, 
    useTheme 
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import React from 'react';
import UserData from '../UserData';
import SkeletonPost from './Skeleton';

import classes from './Post.module.scss';

const Post = ({
    user, 
    image, 
    postDate, 
    title, 
    text,
    tags,
    views,
    comments, 
    isLoading,
    isEditable
}) => {
    const theme = useTheme();

    if (isLoading) {
        return <SkeletonPost />
    }
    
    return (
            <Card 
                variant='outlined'
                className={classes.root}
            >
                {isEditable ? (
                    <Box className={classes.editButtons}>
                        <IconButton color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary">
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
                        minHeight: '200px',
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
                        {title}
                    </Typography>
                    <CardMedia 
                        image={image}
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
                        {text}
                    </Typography>
                    <Stack direction='row' spacing={1}>
                        {tags.map((tag, i) => (
                            <Typography 
                                variant='subtitle2' 
                                mb={1} 
                                key={i} 
                                component='a' 
                                href='/'
                            >
                                #{tag}
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
                                <VisibilityIcon sx={{mr: 1}} />
                                <Typography variant='subtitle'>{views}</Typography>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                            >
                                <CommentIcon sx={{mr: 1}} />
                                <Typography variant='subtitle'>{comments}</Typography>
                            </Stack>
                        </Stack>
                </CardContent>
            </Card>
    );
};

export default Post;