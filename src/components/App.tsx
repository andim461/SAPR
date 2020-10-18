import React, { useState } from 'react';
import Header from './Header/Header';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pre from './Pre/Pre';

function App() {
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
                        <Pre dataNodes={nodesData} changeNodes={changeNodes} />
                    </Route>
                    <Route path="/pro"></Route>
                    <Route path="/post"></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
