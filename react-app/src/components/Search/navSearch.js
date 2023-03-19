import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchThunk } from '../../store/search';
import { useHistory } from 'react-router-dom';

const NavSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    let history = useHistory();
    // const searchResult = useSelector(state => state.searchReducer);
    const dispatch = useDispatch();

    const handleSearch = async () => {
      dispatch(searchThunk(searchTerm))
      .then(() => history.push(`/search`))
    };

    return (
      <div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>

      </div>
    );
  };

  export default NavSearch;
