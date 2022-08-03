import React from 'react';
import {  
    Box,
    Button,
    Divider,
    Grid,
    Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Post from '../../components/Post';
import TagBlock from '../../components/TagBlock';
import CommentBlock from '../../components/CommentBlock';

const Main = () => {
    const posts = [
        {
            title: 'Title',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium pariatur veritatis dolor autem nobis ab ut nulla impedit commodi quae reiciendis iusto aperiam totam rem quibusdam quia, tempora aspernatur fuga?',
            author: {
                name: 'Thomas'
            },
            createAt: 'september 23',
            tags: ['tag3', 'sometag'],
            previewUrl: 'https://source.unsplash.com/random',
            viewsCount: 3,
            commentsCount: 3
        },
        {
            title: 'Title2',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium pariatur veritatis dolor autem nobis ab ut nulla impedit commodi quae reiciendis iusto aperiam totam rem quibusdam quia, tempora aspernatur fuga?',
            author: {
                name: 'Arthur'
            },
            createAt: 'september 23',
            tags: ['tag1', 'tag2', 'sometag'],
            previewUrl: 'https://source.unsplash.com/random',
            viewsCount: 3,
            commentsCount: 3
        },
        {
            title: 'Title3',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium pariatur veritatis dolor autem nobis ab ut nulla impedit commodi quae reiciendis iusto aperiam totam rem quibusdam quia, tempora aspernatur fuga?',
            author: {
                name: 'John'
            },
            createAt: 'september 23',
            tags: ['tag1', 'tag3', 'sometag'],
            previewUrl: 'https://source.unsplash.com/random',
            viewsCount: 3,
            commentsCount: 3
        }
    ];
    const postLoading = false;

    const comments = [
        {
            author: {
                name: 'Thomas'
            },
            text: 'This comment is first comment of this blog',
            createAt: 'september 23'
        },
        {
            author: {
                name: 'Thomas'
            },
            text: 'This comment is first comment of this blog',
            createAt: 'september 23'
        },
        {
            author: {
                name: 'Thomas'
            },
            text: 'This comment is first comment of this blog',
            createAt: 'september 23'
        }
    ]
    const commentLoading = false;
    const tagLoading = false;

    return (
        <Grid 
            container 
            spacing={2}
            wrap='wrap-reverse'
            sx={{mt: 8, mb: 4}}
        >
            <Grid item xs={12} sm={7} md={8}>
                {(postLoading ? [...Array(5)] : posts).map((post, i) => (
                    postLoading 
                    ? (
                        <Post 
                            key={i}
                            isLoading={postLoading}
                        />
                    ) : (
                        <Post 
                            key={i}
                            user={post.author} 
                            image={post.previewUrl}
                            postDate={post.createAt}
                            title={post.title}
                            tags={post.tags}
                            text={post.text}
                            views={post.viewsCount}
                            comments={post.commentsCount}
                            isLoading={postLoading}
                            isEditable
                        />
                    )
                    
                ))}
                <Stack
                    justifyContent="center"
                    direction="row"
                >
                    <Button 
                        startIcon={<ExpandMoreIcon/>}
                        variant='contained' 
                        color='secondary'
                        size='small'
                        disabled={postLoading}
                    >
                        Ещё
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={5} md={4}>
                <TagBlock tags={['tag1', 'tag2', 'tag3', 'sometag']} isLoading={tagLoading} />
                <Divider variant="fullWidth" sx={{my: 2, display: { xs: 'none', sm: 'block' }}}/>
                <Box sx={{display: { xs: 'none', sm: 'block' }}}>
                    <CommentBlock  comments={comments} isLoading={commentLoading} />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Main;