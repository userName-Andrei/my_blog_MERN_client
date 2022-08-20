import {useState, useRef} from 'react';
import { Avatar, Box, Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const [formData, setFormData] = useState({
        avatar: {},
        name: '',
        password: '',
        email: '',
        showPassword: false
    });
    const [avatarUrl, setAvatarUrl] = useState("");
    const inputFileRef = useRef();
    const reader = new FileReader();

    const onChangeAvatar = (e) => {
        setFormData(({
            ...formData,
            avatar: e.target.files[0]
        }))

        reader.readAsDataURL(e.target.files[0])

        reader.onloadend = () => {
            setAvatarUrl(reader.result)
        }
    }

    const onDeleteAvatar = () => {
        setFormData(({
            ...formData,
            avatar: {}
        }))
        setAvatarUrl('')
        inputFileRef.current.value = '';
    }

    const handleClickShowPassword = () => {
        setFormData(formData => ({
            ...formData,
            showPassword: !formData.showPassword,
        }));
    };

    return (

        <Container
            maxWidth='xs' 
            sx={{mt: 10}}
        >
            <form>
                <Stack
                    alignItems='center'
                    spacing={2}
                >
                    <Typography
                        variant='h4'
                    >
                        Регистрация
                    </Typography>
                    <Avatar 
                        src={avatarUrl} 
                        alt='avatar' 
                        sx={{
                            width: 96,
                            height: 96
                        }}
                    />
                    <Box>
                        <Button 
                            variant="contained" 
                            component="label"
                            endIcon={<PhotoCamera/>}
                            color={avatarUrl ? 'error' : 'secondary'}
                            onClick={() => avatarUrl ? onDeleteAvatar() : inputFileRef.current.click()}
                            sx={{
                                alignSelf: 'flex-start',
                            }}
                        >
                            {avatarUrl ? 'Удалить' : 'Загрузить'}
                        </Button>
                        <input 
                            name='avatarUrl'
                            ref={inputFileRef}
                            onChange={onChangeAvatar}
                            type="file" 
                            accept="image/jpeg, image/jpg, image/png, image/giff" 
                            hidden
                            multiple 
                        />
                    </Box>
                    <TextField 
                        label="Введите ваш email" 
                        variant="outlined"
                        color='secondary' 
                        fullWidth 
                        autoFocus
                    />
                    <TextField 
                        label="Введите ваше имя" 
                        variant="outlined" 
                        color='secondary'
                        fullWidth
                    />
                    <TextField 
                        label="Введите ваше пароль" 
                        variant="outlined" 
                        color='secondary'
                        type={formData.showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: formData.showPassword ? <IconButton onClick={handleClickShowPassword}><VisibilityOffIcon /></IconButton> 
                                                                : <IconButton onClick={handleClickShowPassword}><VisibilityIcon /></IconButton>,
                          }}
                        fullWidth
                    />
                    <Button
                        variant='contained'
                        color='secondary'
                        fullWidth
                    >
                        Зарегистрироваться
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default Register;