import React, { Component } from 'react';
import PostIndexPage from "./components/PostIndexPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PostShowPage from "./components/PostShowPage";
import NavBar from "./components/NavBar";


import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Welcome!</h1>
          <NavBar>

          </NavBar>
          <Switch>
            <Route path="/posts/:id" exact component={PostShowPage} />
            <Route path="/posts" exact component={PostIndexPage} />

          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
