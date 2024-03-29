import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CartIcon from '../Icons/cart';
import Search from '../Search';
import NavSearch from '../Search/navSearch';
import './Navigation.css';
import AddProduct from '../Products/addProduct';
import { Toggle } from 'react-hook-theme';
import 'react-hook-theme/dist/styles/style.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navStart'>
  			<ul className="Navbar">
    			<li>
      				<NavLink className="home-button" exact to="/">Home</NavLink>
    			</li>
				  <Toggle />
				<li className="nav-search">
					<NavSearch  />
				</li>

      			<li>
        		<NavLink className="cart-button"exact to='/cart'><CartIcon/></NavLink>
      			</li>
    			{isLoaded && (
					<li className='profile-button-li'>
        		<ProfileButton className="profile-button" user={sessionUser} />
      			</li>
   			 )}
 		 </ul>
		</div>

	);
}

export default Navigation;
