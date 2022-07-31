import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import {
    Main,
    Post,
    AddPost,
    Login,
    Register
} from '../pages';

function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
