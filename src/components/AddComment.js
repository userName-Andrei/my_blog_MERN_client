import React from 'react';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import { createComment } from '../store/slices/postSlice';
import {useParams} from 'react-router-dom';

import { Avatar, Box, TextField, Stack, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const AddComment = ({user}) => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.posts.newComment.status)
    const postId = useParams().id;
    const schema = yup.object({
        text: yup.string().trim().ensure().required('Поле не может быть пустым')
    }).required();

    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = (comment) => {
        dispatch(createComment({postId, comment, author: user}))
        reset();
    }

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField 
                        {...register('text')}
                        label='Написать комментарий'
                        variant='outlined'
                        minRows={3}
                        maxRows={8}
                        type='text'
                        color={Boolean(errors.text?.message) ? 'error' : 'secondary'}
                        error={Boolean(errors.text?.message)}
                        helperText={errors.text?.message}
                        multiline
                        fullWidth
                        sx={{mb: 2}}
                    />
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        type='submit'
                        endIcon={<SendIcon />}
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Звгрузка...' : 'Отправить'}
                    </Button>
                </form>
            </Box>
        </Stack>
    );
};

export default AddComment;