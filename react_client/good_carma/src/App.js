import React, { Component } from 'react';
import PostIndexPage from "./components/PostIndexPage";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome!</h1>
        <PostIndexPage>
          
        </PostIndexPage>
      </div>
    );
  }
}

export default App;
