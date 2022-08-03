import { Stack } from '@mui/material';
import React from 'react';
import AddComment from '../../components/AddComment';
import CommentBlock from '../../components/CommentBlock';
import Post from '../../components/Post';

const FullPost = () => {
    const post = {
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
    }
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

    return (
        <Stack mt={10}>
            <Post 
                user={post.author} 
                image={post.previewUrl}
                postDate={post.createAt}
                title={post.title}
                tags={post.tags}
                text={post.text}
                views={post.viewsCount}
                comments={post.commentsCount}
                isLoading={postLoading}
                isFullPost
            />
            <CommentBlock comments={comments} isLoading={commentLoading}/>
            <AddComment user={post.author}/>
        </Stack>
    );
};

export default FullPost;