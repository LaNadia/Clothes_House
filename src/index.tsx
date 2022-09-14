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
        </Routes>
      </BrowserRouter>
    </Provider>
);
