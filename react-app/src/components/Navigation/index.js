import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
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
				<li>
				<NavLink className="add-button"exact to='/new'>Add an Item</NavLink>
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
