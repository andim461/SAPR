import React, { useState } from 'react';
import Header from './Header/Header';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pre from './Pre/Pre';

function App() {
	const [rodsData, setRods] = useState<Array<Object>>([]);
	const changeRods = (data: Array<Object>) => {
		setRods(data);
	};

	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route path="/pre">
						<Pre dataRods={rodsData} changeRods={changeRods} />
					</Route>
					<Route path="/pro"></Route>
					<Route path="/post"></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
