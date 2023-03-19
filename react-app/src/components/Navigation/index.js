import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CartIcon from '../Icons/cart';
import './Navigation.css';
import AddProduct from '../Products/addProduct';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>
  			<ul class="Navbar">
    			<li>
      				<NavLink class="home-button" exact to="/">Home</NavLink>
    			</li>
   			 <div class="leftsidebuttons">
      			<li>
        		<NavLink class="add-button"exact to='/new'>Add an Item</NavLink>
      			</li>
      			<li>
        		<NavLink class="cart-button"exact to='/cart'><CartIcon/></NavLink>
      			</li>
      			<li>
        		<NavLink class="order-button"exact to='/orders'>Orders</NavLink>
      			</li>
    			</div>
    			{isLoaded && (
      			<li>
        		<ProfileButton class="profile-button" user={sessionUser} />
      			</li>
   			 )}
 		 </ul>
		</div>

	);
}

export default Navigation;
