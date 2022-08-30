import {useEffect, Suspense, lazy} from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuth } from '../store/slices/authSlice';
import Header from '../components/Header';

import { Container, ThemeProvider } from '@mui/material';
import theme from '../theme';


const Main = lazy(() => import('../pages/Main'));
const FullPost = lazy(() => import('../pages/Post'));
const AddPost = lazy(() => import('../pages/AddPost'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuth())
    }, [])

    return (
        <>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Header/>
                    <Suspense>
                        <Container maxWidth="lg">
                            <Routes>
                                <Route path='/' element={<Main/>} />
                                <Route path='*' element={<Main/>} />
                                <Route path='/posts/tags/:tag' element={<Main/>} />
                                <Route path='/posts/:id' element={<FullPost/>} />
                                <Route path='/posts/:id/edit' element={<AddPost/>} />
                                <Route path='/posts/add-post' element={<AddPost/>} />
                                <Route path='/login' element={<Login/>} />
                                <Route path='/register' element={<Register/>} />
                            </Routes>
                        </Container>
                    </Suspense>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
