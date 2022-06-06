import {useState, useEffect} from 'react';
import SearchResultsContainer from './SearchResultsContainer';

function SearchSpybook() {

  const [allUsers, setAllUsers] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    fetch('/api/users')
    .then(response => response.json())
    .then(users => setAllUsers(users));
  }, []);

  const displayedUsers = allUsers.filter(
    user => `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchString.toLowerCase())
  );

  function changeSearchStringHandler(event) {
    setSearchString(event.target.value);
  }

  return (
    <div className='search-spybook'>
      <input
        type='search'
        placeholder='Search Spyb👀k'
        value={searchString}
        onChange={changeSearchStringHandler}
      />
      <SearchResultsContainer
        displayedUsers={displayedUsers}
        searchString={searchString}
      />
    </div>
  );
}

export default SearchSpybook;