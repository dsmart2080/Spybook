import Login from './Login';
import {Link, useHistory} from 'react-router-dom';
import SearchSpybook from './SearchSpybook'; 

function NavBar({user, setUser}) {

  const history = useHistory();

  // logout
  function logoutHandler() {
    fetch('/api/logout', {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setUser(null);
        history.push('/');  // automatically go to login/signup page after logout
      }
    });
  }

  // if no user is logged in
  if (!user) {
    return (
      <header className='header'>
        <nav className='header-nav-logged-out'>
          <h1 className='header-logo-logged-out'>
            <Link exact to='/'>
              Spyb👀k
            </Link>
          </h1>
          <Login setUser={setUser} />
        </nav>
      </header>
    );
  }

  // if an user is logged in
  return (
    <header className='header'>
      <nav className='header-nav'>
        <h1 className='header-logo'>
          <Link exact to='/home_feed'>
            Spyb👀k
          </Link>
        </h1>
        <SearchSpybook />
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