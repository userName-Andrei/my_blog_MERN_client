import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchLogin, isAuthChecker } from '../../store/slices/authSlice';
import {useNavigate, Link} from 'react-router-dom';

import { Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.auth.status);
    const isAuth = useSelector(isAuthChecker);
    const navigate = useNavigate();

    const schema = yup.object({
        email: yup.string().lowercase().trim().email('Не корректный адрес.').required('Обязательное поле'),
        password: yup.string().min(5, 'Минимум 5 символов').trim().required('Обязательное поле')
    }).nullable().required();

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword)
    };

    const onSubmit = (data) => {
        dispatch(fetchLogin(data))
    };

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
                    <Typography
                        variant='h4'
                    >
                        Авторизация
                    </Typography>
                    <TextField 
                        label="Введите ваш email" 
                        variant="outlined"
                        color='secondary' 
                        type='email'
                        {...register('email')}
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        fullWidth 
                        autoFocus
                    />
                    <TextField 
                        label="Введите ваш пароль" 
                        variant="outlined" 
                        color='secondary'
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: showPassword ? <IconButton onClick={handleClickShowPassword}><VisibilityOffIcon /></IconButton> 
                                                                : <IconButton onClick={handleClickShowPassword}><VisibilityIcon /></IconButton>,
                          }}
                        fullWidth
                    />
                    {status === 'error' && <Typography variant='body1' color='error' my={2}>Произошла ошибка. Попробуйте позже</Typography>}
                    <Button
                        variant='contained'
                        color='secondary'
                        type='submit'
                        fullWidth
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Загрузка...' : 'Войти'}
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default Login;