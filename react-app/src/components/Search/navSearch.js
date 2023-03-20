import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchThunk } from '../../store/search';
import { useHistory } from 'react-router-dom';
import "../Navigation/Navigation.css"

const NavSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    let history = useHistory();
    // const searchResult = useSelector(state => state.searchReducer);
    const dispatch = useDispatch();

    const handleSearch = async () => {
      dispatch(searchThunk(searchTerm))
      .then(() => history.push(`/search`))
    };

    const enterKey = (e) => {
      if (e.key === 'Enter') {
        handleSearch()
      }
    }
    return (
      <div className="search-bar">
        <input type="input" className="inputbar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={enterKey}/>
        <button className="searchbutton"onClick={handleSearch}><i class="fa-solid fa-magnifying-glass"></i></button>

      </div>
    );
  };

  export default NavSearch;
