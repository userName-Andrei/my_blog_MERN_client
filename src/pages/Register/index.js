import {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Avatar, Box, Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { fetchRegister, isAuthChecker } from '../../store/slices/authSlice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(isAuthChecker)

    const schema = yup.object({
        name: yup.string().min(2, 'Имя должно состоять минимум из 2 символов').trim().required('Поле не может быть пустым'),
        password: yup.string().min(5, 'Минимум 5 символов').trim().required('Обязательное поле'),
        email: yup.string().lowercase().trim().email('Не корректный адрес.').required('Обязательное поле')
    }).required();
    const {register, reset, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            password: '',
            email: ''
        },
        mode: 'onChange'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const inputFileRef = useRef();
    const reader = new FileReader();

    const onChangeAvatar = (e) => {
        setValue('avatar', e.target.files[0])

        reader.readAsDataURL(e.target.files[0])

        reader.onloadend = () => {
            setAvatarUrl(reader.result)
        }
    }

    const onDeleteAvatar = () => {
        setValue('avatar', {})
        setAvatarUrl('')
        inputFileRef.current.value = '';
    }

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword);
    };

    const onSubmit = (data) => {
        const formData = new FormData();

        for (let key in data) {
            formData.append(`${key}`, data[key])
        }
        
        dispatch(fetchRegister(formData))
        onDeleteAvatar()
        reset()
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    return (

        <Container
            maxWidth='xs' 
            sx={{mt: 10}}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    alignItems='center'
                    spacing={2}
                >
                    <Typography variant='h4'>Регистрация</Typography>
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
                        type='email'
                        error={errors.email?.message}
                        helperText={errors.email?.message}
                        fullWidth 
                        {...register('email')}
                    />
                    <TextField 
                        label="Введите ваше имя" 
                        variant="outlined" 
                        color='secondary'
                        type='text'
                        error={errors.name?.message}
                        helperText={errors.name?.message}
                        fullWidth
                        {...register('name')}
                    />
                    <TextField 
                        label="Введите ваше пароль" 
                        variant="outlined" 
                        color='secondary'
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: showPassword ? <IconButton onClick={handleClickShowPassword}><VisibilityOffIcon /></IconButton> 
                                                                : <IconButton onClick={handleClickShowPassword}><VisibilityIcon /></IconButton>,
                        }}
                        error={errors.password?.message}
                        helperText={errors.password?.message}
                        fullWidth
                        {...register('password')}
                    />
                    <Button
                        variant='contained'
                        color='secondary'
                        type='submit'
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