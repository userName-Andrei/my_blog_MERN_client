import {useState, useRef} from 'react';
import {useLocation} from 'react-router-dom';

import { Box, Button, Container, Stack, TextField } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import classes from './AddPost.module.scss';

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
                                color={preview ? 'error' : 'primary'}
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
                        helperText='через запятую'
                        multiline
                    />
                    <TextField
                        variant="outlined"
                        name='text'
                        onChange={(e) => setFormData(({...formData, text: e.target.value}))}
                        value={formData.text}
                        label='Введите текст статьи'
                        rows={5}
                        helperText=''
                        multiline
                    />
                    <Button
                        variant="contained"
                    >
                        {location === 'add-post' ? 'Сохранить' : 'Измененить'}
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default AddPost;