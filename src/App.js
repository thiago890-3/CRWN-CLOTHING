import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import Header from './pages/header/header.component'
import SignInAndSignOut from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

const HatsPage = (props) =>{
  console.log(props)
  return (<div><h1>HATS</h1></div>)
}

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/hats' component={HatsPage} />
        <Route path='/signin' component={SignInAndSignOut} />
      </Switch>
    </div>
  );
}

export default App;
