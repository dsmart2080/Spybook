import NavBar from './NavBar';
import {Route, Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Signup from './Signup';
import HomeFeed from './HomeFeed';
import UserProfile from './UserProfile';
import Footer from './Footer';



function App(){
    const [user, setUser] = userState(null);

    // calls to login
    useEffect(() => {
        fetch('/api/auto_login')
        .then(response =>{
            if (response.ok){
                response.json().then(jsonData=> setUser(jsonData));
            }
        });
    },[]);

    //If no user is logged in 
    if (!user){
        return(
            
        )
    }
}