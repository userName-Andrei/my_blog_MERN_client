import { Stack } from '@mui/material';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import AddComment from '../../components/AddComment';
import CommentBlock from '../../components/CommentBlock';
import ReactMarkdown from 'react-markdown';
import Post from '../../components/Post';
import axios from '../../utils/axios';

const FullPost = () => {
    const [post, setPost] = useState({item: {}, status: 'loading'})
    const [comments, setComments] = useState({items: [], status: 'loading'})
    const postId = useParams().id;

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
    
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/comments/${postId}`)

            setComments(state => ({
                items: response.data,
                status: 'loaded'
            }))
        } catch (error) {
            setComments(state => ({
                ...state,
                status: 'error'
            }))
        }
    }

    useEffect(() => {
        fetchPost()
        fetchComments()
    }, []);

    return (
        <Stack mt={10} mb={4}>
            <Post 
                user={post.item.author} 
                image={post.item.previewUrl}
                postDate={post.item.createAt}
                title={post.item.title}
                tags={post.item.tags}
                text={<ReactMarkdown children={post.item.text} />}
                views={post.item.viewsCount}
                comments={post.item.commentCount}
                isLoading={post.status === 'loading'}
                isFullPost
            />
            <CommentBlock comments={comments.items} isLoading={comments.status === 'loading'}/>
            {/* <AddComment user={post.author}/> */}
        </Stack>
    );
};

export default FullPost;