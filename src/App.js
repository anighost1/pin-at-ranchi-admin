import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyProfile from './pages/MyProfile';
import Category from './pages/Category';
import Item from './pages/Item';
import ItemDetails from './components/ItemDetails';
import CategoryDetails from './components/CategoryDetails';

function App() {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Sidebar />
                <Header />
                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
                        pb: { xs: 2, sm: 2, md: 3 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                        overflow: 'auto',
                    }}
                >
                    <Routes>
                        <Route path='/' element={<MyProfile />} />
                        <Route path='/category' element={<Category />} />
                        <Route path='/category/details' element={<CategoryDetails />} />
                        <Route path='/category/details/:id' element={<CategoryDetails />} />
                        <Route path='/item' element={<Item />} />
                        <Route path='/item/details/:itemId' element={<ItemDetails />} />
                        <Route path='/item/details' element={<ItemDetails />} />
                    </Routes>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default App;
