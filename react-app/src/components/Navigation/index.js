import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import AddProduct from '../addProduct';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
				<NavLink exact to='/new'>Add an Item</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />


				</li>
			)}
		</ul>
	);
}

export default Navigation;
