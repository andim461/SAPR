import React, { useState } from 'react';
import Header from './Header/Header';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter,
} from 'react-router-dom';
import Pre from './Pre/Pre';
import Pro from './Pro/Pro';
import Post from './Post/Post';

function App() {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route path="/pre">
                    <Pre />
                </Route>
                <Route path="/pro">
                    <Pro />
                </Route>
                <Route path="/post">
                    <Post />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
