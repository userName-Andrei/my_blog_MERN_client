import { 
    AppBar, 
    Avatar, 
    Button, 
    IconButton, 
    Menu, 
    MenuItem, 
    Stack, 
    Toolbar, 
    Typography 
} from '@mui/material';
import { Container } from '@mui/system';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { logout, isAuthChecker } from '../store/slices/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthChecker);
    const userData = useSelector(state => state.auth.user);
    const [anchorElUser, setAnchorElUser] = useState(null);

    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth='lg'>
                <Toolbar
                    disableGutters={true}
                >
                    <Typography 
                        variant='h5'
                        sx={{mr: 'auto'}}
                    >
                        <Link to='/'>
                            My Blog
                        </Link>
                    </Typography>
                    <Stack 
                        spacing={2} 
                        direction="row"
                    >
                        {!isAuth ? 
                        <>
                            <Link to='/login'>
                                <Button color='inherit'>
                                    Вход
                                </Button>
                            </Link>
                            <Link to='/register'>
                                <Button 
                                    variant="outlined" 
                                    color='secondary'
                                >
                                    Регистрация
                                </Button>
                            </Link>
                        </> : 
                        <>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={userData.avatarUrl || null}/>
                            </IconButton>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="user-menu"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to='/posts/add-post'>
                                        <Typography textAlign="center">
                                            Написать статью
                                        </Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Button 
                                        fullWidth={true}
                                        size='small'
                                        variant="contained" 
                                        color='error'
                                        onClick={() => dispatch(logout())}
                                    >
                                        Выход
                                    </Button>
                                </MenuItem>
                            </Menu>
                        </>}

                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;