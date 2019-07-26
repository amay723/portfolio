import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import Header from './Header/Header'
import Home from './Home/Home'
import Projects from './Projects/Projects'
import Tools from './Tools/Tools'
import Games from './Games/Games'
import Mastermind from './Games/Games/Mastermind/Mastermind'
import Snake from './Games/Games/Snake/Snake'
import Contact from './Contact/Contact'

const PageNotFound = () => (
    <h2>404 - Page not found</h2>
);

function App() {

    return (
        <Router basename="/portfolio">
            <div className="App">
                <Header/>

                <div className="App-contents">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/projects' component={Projects} />
                        {/* Better way to do these links? */}
                        <Route exact path='/games/mastermind' component={Mastermind} />
                        <Route exact path='/games/snake' component={Snake} />
                        <Route exact path='/tools' component={Tools} />
                        <Route exact path='/games' component={Games} />
                        <Route exact path='/contact' component={Contact} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>

            </div>
        </Router>
  );
}

export default App;
