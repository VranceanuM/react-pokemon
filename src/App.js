import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/layouts/Dashboard'
import Navbar from './components/layouts/Navbar'
import Pokemon from './components/view/Pokemon'

import {BrowserRouter ,Route,Switch} from 'react-router-dom'

const style = theme => ({
  root: {
    flexGrow:1
  }
})

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path ="/" component={Dashboard}></Route>
        <Route exact path ="/pokemon/:pokemonIndex" component={Pokemon}></Route>
       </div>
      </BrowserRouter>
      
    );
  }}

export default App;
