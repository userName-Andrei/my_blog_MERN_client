import {useState, useRef, useCallback, useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import SimpleMDE from "react-simplemde-editor";

import { Box, Button, Container, Stack, TextField } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import classes from './AddPost.module.scss';
import "easymde/dist/easymde.min.css";

const AddPost = () => {
    const [formData, setFormData] = useState({
        preview: {},
        title: '',
        text: '',
        tags: []
    });
    const [preview, setPreview] = useState("");
    const inputFileRef = useRef();
    const location = useLocation().pathname.indexOf('add-post') !== -1 ? 'add-post' : 'edit';
    const reader = new FileReader();

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

    const onChangeMDE = useCallback((value) => {
        setFormData(({
            ...formData,
             text: value
        }))
    }, [])

    const onChangePreview = (e) => {
        setFormData(({
            ...formData,
            preview: e.target.files[0]
        }))

        reader.readAsDataURL(e.target.files[0])

        reader.onloadend = () => {
            setPreview(reader.result)
        }
    }

    const onDeletePreview = () => {
        setFormData(({
            ...formData,
            preview: {}
        }))
        setPreview('')
        inputFileRef.current.value = ''
    }
    
    return (
        <Container 
            maxWidth='sm' 
            sx={{
                mt: 15,
                mb: 4
            }}
        >
            <form action="">
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
                                color={preview ? 'error' : 'secondary'}
                                onClick={() => preview ? onDeletePreview() : inputFileRef.current.click()}
                                sx={{
                                    alignSelf: 'flex-start',
                                }}
                            >
                                {preview ? 'Удалить превью' : 'Загрузить превью'}
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
                            {preview && <img src={preview} className={classes.preview} alt='preview' />}
                        </Box>
                    </Stack>
                    <TextField 
                        variant="standard"
                        name='title'
                        onChange={(e) => setFormData(({...formData, title: e.target.value}))}
                        value={formData.title}
                        label='Введите заголовок статьи'
                        color='secondary'
                        maxRows={3}
                        helperText=''
                        multiline
                        autoFocus
                    />
                    <TextField
                        variant="standard"
                        name='tags'
                        onChange={(e) => setFormData(({...formData, tags: e.target.value}))}
                        value={formData.tags}
                        label='Введите теги к статье'
                        color='secondary'
                        helperText='через запятую'
                        multiline
                    />
                    <SimpleMDE className={classes.editor} value={formData.text} options={optionsMDE} onChange={onChangeMDE} />
                    <Button
                        variant="contained"
                        color='secondary'
                    >
                        {location === 'add-post' ? 'Сохранить' : 'Измененить'}
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default AddPost;