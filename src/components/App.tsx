import React from 'react';
import Header from './Header/Header';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TableRods from './Tables/TableRods';

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route path="/pre">
						<TableRods></TableRods>
					</Route>
					<Route path="/pro"></Route>
					<Route path="/post"></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
