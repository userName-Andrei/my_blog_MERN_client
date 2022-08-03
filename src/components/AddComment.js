import { Avatar, Box, TextField, Stack, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';

const AddComment = ({user}) => {
    return (
        <Stack 
            direction='row' 
            width='100%' 
            pl={2}
        >
            <Avatar
                src={user.avatarUrl || null}
                sx={{mr: 2}}
            />
            <Box flexGrow={1}>
                <TextField 
                    label='Написать комментарий'
                    variant='outlined'
                    maxRows={8}
                    type='text'
                    name='text'
                    multiline
                    fullWidth
                    sx={{mb: 2}}
                />
                <Button 
                    variant='contained' 
                    color='primary' 
                    endIcon={<SendIcon />}
                >
                    Отправить
                </Button>
            </Box>
        </Stack>
    );
};

export default AddComment;