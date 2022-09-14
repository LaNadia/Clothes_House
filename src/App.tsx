import React from 'react';
import './App.css';
import axios from 'axios';
import HomePage from './features/components/homePageBanner/homePage';
import Header from './features/components/header/header';
import { useDispatch } from 'react-redux';
import {getStories} from './app/reducers/getStoryList'
import { getArrival, getTrending } from './app/reducers/getClothes'
import {useEffect} from 'react';


function App() {
  
  const dispatch = useDispatch();

  const fetchData = async () => {
    try{
        const data =  await axios.get('https://shortstories-api.herokuapp.com/stories');
        dispatch(getStories(data.data));

        const arrival = await axios.get('https://fakestoreapi.com/products?limit=20');
        dispatch(getArrival(arrival.data));

        const trending = await axios.get('https://fakestoreapi.com/products?limit=6');
        dispatch(getTrending(trending.data));

    } catch (error) {
        console.log('error:', error)
    }
  };
  
  useEffect( () => {
      fetchData()
  }, [])

  return (
    <div>
      <Header/>
      <HomePage/>
    </div>
  );
}

export default App;
