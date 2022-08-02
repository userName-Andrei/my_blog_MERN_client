import React from 'react';
import {  
    Stack
} from '@mui/material';
import Post from '../../components/Post';

const Main = () => {
    return (
        <Stack 
            sx={{mt: 10}}
            direction='row' 
            spacing={2}
        >
            <Stack
                spacing={2}
                sx={{
                    flexGrow: 1
                }}
            >
                <Post 
                    user={{name: 'Thomas', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'}} 
                    postDate='september 23'
                    title='Title'
                />
            </Stack>
        </Stack>
    );
};

export default Main;