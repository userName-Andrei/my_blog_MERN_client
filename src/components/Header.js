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

const Header = () => {
    const [isAuth, setIsAuth] = useState(false);
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
                <Toolbar>
                    <Typography 
                        variant='h5'
                        sx={{mr: 'auto'}}
                    >
                        My Blog
                    </Typography>
                    <Stack spacing={2} direction="row">
                        {!isAuth ? 
                        <>
                            <Button color='inherit'>Вход</Button>
                            <Button variant="outlined" color='secondary'>Регистрация</Button>
                        </> : 
                        <>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar />
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
                                    <Typography textAlign="center">Написать статью</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Button 
                                        fullWidth={true}
                                        size='small'
                                        variant="contained" 
                                        color='error'
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