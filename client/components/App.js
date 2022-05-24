import NavBar from './NavBar';
import {Route, Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Signup from './Signup';
import HomeFeed from './HomeFeed';
import UserProfile from './UserProfile';
import Footer from './Footer';



function App(){
    const [user, setUser] = userState(null);

    //calls to login
    //Handles the automatic login
    useEffect(() => {
        fetch('/api/auto_login')
        .then(response =>{
            if (response.ok){
                response.json().then(jsonData=> setUser(jsonData));
            }
        });
    },[]);

    //Execute this if no user is logged in.
    if (!user){
        return(
            <>
            <NavBar user={user} setUser = {setUser}/>
            <Switch>
                <Route exact path='/'>
                    <SIgnup setUser={setUser}/>
                </Route>
            </Switch>
            <Footer user={user}/>
            </>
        );
    }


    //Execute if user is logged in.
    return (
        <>
        
        </>
    )
}