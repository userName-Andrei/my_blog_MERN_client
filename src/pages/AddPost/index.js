import {useState,
     useRef,
     useCallback,
     useMemo,
     useEffect
} from 'react';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SimpleMDE from "react-simplemde-editor";

import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import classes from './AddPost.module.scss';
import "easymde/dist/easymde.min.css";
import { clearPosts, createPost, fetchPostByPostId, updatePost } from '../../store/slices/postSlice';
import useImagePreviewer from '../../hooks/useImagePreviewer';

const AddPost = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.user);
    const status = useSelector(state => ({name: state.posts.posts.status, message: state.posts.posts.errorMessage}));
    const navigate = useNavigate();
    const inputFileRef = useRef();
    const {onChangePreview, onDeletePreview, setPreviewURL, preview, previewURL} = useImagePreviewer(inputFileRef);
    const location = useLocation().pathname.indexOf('add-post') !== -1 ? 'add-post' : 'edit';
    const postId = useParams().id;

    const schema = yup.object({
        title: yup.string().trim().required('Поле не может быть пустым'),
        text: yup.string().min(10, 'Минимум 10 символов').trim().required('Обязательное поле')
    }).required();
    
    const {reset, setValue, getValues, handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            text: '',
            tags: []
        },
        mode: 'onChange'
    });

    const optionsMDE = useMemo(() => ({
        spellChecker: false,
        maxHeight: '300px',
        placeholder: 'Введите текст',
        status: false,
        autosave: {
            enable: true,
            delay: 1000
        }
    }), []);

    useEffect(() => {
        if (!userData) {
            navigate('/')
            return
        }

        dispatch(clearPosts())

        if (location === 'edit') {
            dispatch(fetchPostByPostId(postId))
                .then(({payload: {text, tags, title, previewUrl, author}}) => {
                    setPreviewURL(previewUrl)
                    setValue('title', title )
                    setValue('text', text)
                    setValue('tags', tags)

                    if (userData._id !== author._id) {
                        console.log(`userData._id - ${userData._id}`, `post.author._id - ${author._id}`)
                        navigate('/')
                    }
                })
                
            return
        }

        
    }, [])

    const onChangeMDE = useCallback((value) => {
        setValue('text', value)
    }, [])

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append('preview', preview)

        for (let key in data) {
            formData.append(`${key}`, data[key])
        }
        
        if (location === 'add-post') {
            dispatch(createPost(formData))
                .then(data => {
                    onDeletePreview()
                    setValue('tags', [])
                    reset()
                    navigate(`/posts/${data.payload._id}`)
                })
            
            return
        }

        dispatch(updatePost({postId, data: formData}))
            .then(data => {
                onDeletePreview()
                setValue('tags', [])
                reset()
                navigate(`/posts/${data.payload._id}`)
            })
    }
    
    return (
        <Container 
            maxWidth='sm' 
            sx={{
                mt: 15,
                mb: 4
            }}
        >
            {status.name === 'error' && 
                <Typography 
                    variant='h4' 
                    color='error' 
                    textAlign='center'
                    gutterBottom
                >
                    {status.message || 'Произошла ошибка! Попробуйте обновить страницу.'}
                </Typography>
            }
            {status.name !== 'error' && 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack 
                        spacing={2}
                    >
                        <Stack 
                            direction='row' 
                            spacing={2}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: '1 0 50%'
                                }}
                            >
                                <Button 
                                    variant="contained" 
                                    component="label" 
                                    endIcon={<PhotoCamera/>}
                                    color={previewURL ? 'error' : 'secondary'}
                                    onClick={() => previewURL ? onDeletePreview() : inputFileRef.current.click()}
                                    sx={{
                                        alignSelf: 'flex-start',
                                    }}
                                >
                                    {previewURL ? 'Удалить превью' : 'Загрузить превью'}
                                </Button>
                                <input 
                                    name='preview'
                                    ref={inputFileRef}
                                    onChange={onChangePreview}
                                    type="file" 
                                    accept="image/jpeg, image/jpg,image/png" 
                                    hidden
                                    multiple 
                                />
                            </Box>
                            <Box
                                sx={{
                                    flex: '1 0 50%'
                                }}
                            >
                                {previewURL && <img src={previewURL} className={classes.preview} alt='preview' />}
                            </Box>
                        </Stack>
                        <Controller 
                            control={control}
                            name='title'
                            render={({field: {onChange, value}}) => (
                                <TextField 
                                    variant="standard"
                                    label='Введите заголовок статьи'
                                    color='secondary'
                                    value={value}
                                    onChange={onChange}
                                    maxRows={3}
                                    error={errors.title}
                                    helperText={errors.title?.message}
                                    multiline
                                    autoFocus
                                />
                            )}
                        />
                        <Controller 
                            control={control}
                            name='tags'
                            render={({field: {onChange, value}}) => (
                                <TextField 
                                    variant="standard"
                                    name='tags'
                                    label='Введите теги к статье'
                                    color='secondary'
                                    value={value}
                                    onChange={onChange}
                                    error={errors.title}
                                    helperText={errors.title ? `${errors.title?.message}` : 'через запятую'}
                                    multiline
                                />
                            )}
                        />
                        <SimpleMDE className={classes.editor} value={getValues('text')} options={optionsMDE} onChange={onChangeMDE} />
                        {errors.text && <Typography variant='caption' color='error'>{errors.text?.message}</Typography>}
                        <Button
                            variant="contained"
                            color='secondary'
                            type='submit'
                        >
                            {location === 'add-post' ? 'Сохранить' : 'Измененить'}
                        </Button>
                    </Stack>
                </form>
            }
        </Container>
    );
};

export default AddPost;