import React from 'react';
import './Header.css';
import { Button } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
	let location = useLocation();

	return (
		<header className="header">
			<Button
				disabled={location.pathname === '/pre'}
				variant="outlined"
				color="secondary"
				size="large"
			>
				<Link className="link" to="/pre">
					Препроцессор
				</Link>
			</Button>
			<Button
				disabled={location.pathname === '/pro'}
				variant="outlined"
				color="secondary"
				size="large"
			>
				<Link className="link" to="/pro">
					Процессор
				</Link>
			</Button>
			<Button
				disabled={location.pathname === '/post'}
				variant="outlined"
				color="secondary"
				size="large"
			>
				<Link className="link" to="/post">
					Постпроцессор
				</Link>
			</Button>
		</header>
	);
};
export default Header;
