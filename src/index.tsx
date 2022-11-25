import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Trending from './features/components/trending/Trending';
import Journal from './features/components/Journal/Journal';
import NewArrival from './features/components/newArrival/newArrival';
import AboutUs from './features/components/aboutUs/aboutUs';
import Cart from './features/components/Cart/Cart';
import Login from 'features/components/Auth/LoginPage/Login';
import Register from 'features/components/Auth/RegisterPage/Register';
import MyProfile from 'features/components/Auth/MyProfile/MyProfile';
import Checkout from 'features/components/Checkout/Checkout';
import './farebaseConfig';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/trending" element={<Trending/>} />
            <Route path="/journal" element={<Journal/>} />
            <Route path="/newarrival" element={<NewArrival/>}/>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/myprofile" element={<MyProfile/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
);
