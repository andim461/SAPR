import React, { useState } from 'react';
import Header from './Header/Header';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pre from './Pre/Pre';
import RodsData from '../interfaces/RodsData';

function App() {
	const [isDataGood, setDataGood] = useState<boolean>(true);

	const [rodsData, setRods] = useState<Array<RodsData>>([]);
	const changeRods = (data: Array<RodsData>) => {
		if (data.length) {
			setDataGood(true);
		}
		for (let i: number = 1; i <= data.length; i++) {
			let isFind = data.find((val) => val.i === i);
			if (!isFind) {
				setDataGood(false);
				break;
			} else {
				setDataGood(true);
			}
		}
		setRods(data);
	};
	const [nodesData, setNodes] = useState<Array<Object>>([]);
	const changeNodes = (data: Array<Object>) => {
		setNodes(data);
	};

	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route path="/pre">
						<Pre
							dataRods={rodsData}
							changeRods={changeRods}
							dataNodes={nodesData}
							changeNodes={changeNodes}
							isDataGood={isDataGood}
						/>
					</Route>
					<Route path="/pro"></Route>
					<Route path="/post"></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
