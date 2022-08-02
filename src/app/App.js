import { Container } from '@mui/system';
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Header from '../components/Header';
import {
    Main,
    Post,
    AddPost,
    Login,
    Register
} from '../pages';

function App() {
    return (
        <>
            <Header/>
            <BrowserRouter>
                <Container maxWidth="lg">
                    <Routes>
                        <Route path='/' element={<Main/>} />
                        <Route path='*' element={<Main/>} />
                        <Route path='/posts/:tag' element={<Main/>} />
                        <Route path='/posts/:id' element={<Post/>} />
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
