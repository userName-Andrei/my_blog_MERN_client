import {useState} from 'react';
import { Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const [formData, setFormData] = useState({
        password: '',
        email: '',
        showPassword: false
    });

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
                        Авторизация
                    </Typography>
                    <TextField 
                        label="Введите ваш email" 
                        variant="outlined"
                        color='secondary' 
                        type='email'
                        fullWidth 
                        autoFocus
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
                        Войти
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default Login;