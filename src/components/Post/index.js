import { 
    Avatar, 
    Box, 
    Card, 
    CardContent, 
    CardHeader, 
    CardMedia, 
    Grid, 
    Stack, 
    Typography, 
    useTheme 
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';

import React from 'react';
import UserData from '../UserData';

const Post = (props) => {
    const theme = useTheme();
    const {
        user,
        postDate,
        title
    } = props
    
    return (
        <Card 
            variant='outlined'
        >
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
                    image='https://source.unsplash.com/random'
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
                <Typography mb={2}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium pariatur veritatis dolor autem nobis ab ut nulla impedit commodi quae reiciendis iusto aperiam totam rem quibusdam quia, tempora aspernatur fuga?
                </Typography>
                    <Stack
                        direction='row'
                    >
                        <Stack
                            direction='row'
                            alignItems='center'
                            mr={2}
                        >
                            <VisibilityIcon sx={{mr: 1}} />
                            <Typography variant='subtitle'>0</Typography>
                        </Stack>
                        <Stack
                            direction='row'
                            alignItems='center'
                        >
                            <CommentIcon sx={{mr: 1}} />
                            <Typography variant='subtitle'>0</Typography>
                        </Stack>
                    </Stack>
            </CardContent>
        </Card>
    );
};

export default Post;