import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CartIcon from '../Icons/cart';
import Search from '../Search';
import NavSearch from '../Search/navSearch';
import './Navigation.css';
import AddProduct from '../Products/addProduct';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>
  			<ul className="Navbar">
    			<li>
      				<NavLink className="home-button" exact to="/">Home</NavLink>
    			</li>
				<li className="nav-search">
					<NavSearch  />
				</li>

      			<li>
        		<NavLink className="cart-button"exact to='/cart'><CartIcon/></NavLink>
      			</li>
    			{isLoaded && (
      			<li>
        		<ProfileButton className="profile-button" user={sessionUser} />
      			</li>
   			 )}
 		 </ul>
		</div>

	);
}

export default Navigation;
