import { Container } from '@mui/system';
import {useEffect} from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuth } from '../store/slices/authSlice';
import Header from '../components/Header';
import {
    Main,
    FullPost,
    AddPost,
    Login,
    Register
} from '../pages';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuth())
    }, [])

    return (
        <>
            <BrowserRouter>
                <Header/>
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
            </BrowserRouter>
        </>
    );
}

export default App;
