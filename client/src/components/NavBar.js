import Login from './Login';
import {Link, useHistory} from 'react-router-dom';
import SearchSpybook from './SearchSpybook';

//Helped with the NavBar
//Designed the color with the NavBar

function NavBar({user, setUser})
{
    const history = useHistory();
    //Execute if no user is present.
    if (!user){
        return (
            <header className='header'>
                <nav className='header-nav-logged-out'>
                    <h1 className='header-logo-logged-out'>
                        <Link exact to='/'>
                            SpyB👀k
                        </Link>
                    </h1>
                    <Login setUser={setUser}/>
                </nav>
            </header>
        );
    }


    //Execute if logging out.
    //Delete API call after logging.
    function logoutHandler(){
        fetch('/api/logout', {
            method: 'DELETE'
        })
        .then(response => {
            if(response.ok){
                setUser(null);
                //Execute right after logout
                history.push('/'); 
            }
        });
    }


    //Execute once User clicks login with correct credentials
    return (
        <header className='header'>
            <nav className='header-nav'>
                <h1 className='header-logo'>
                    <Link exact to='/home_feed'>
                        SpyB👀k
                    </Link>
                </h1>
                <SearchSpybook/>
                <ul className='header-list'>
                <li>
                    <Link exact to={`/users/${user.id}`}>
                        {user.first_name}
                    </Link>
                </li>
                <li>Notifications</li>
                <li><button onClick={logoutHandler}>Logout</button></li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
