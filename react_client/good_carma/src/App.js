import React, { Component } from 'react';
import PostIndexPage from "./components/PostIndexPage";
import SignInPage from "./components/SignInPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PostShowPage from "./components/PostShowPage";
import NavBar from "./components/NavBar";
import LeaderBoardMain from "./components/LeaderBoardMain";
import { User, Session } from "./requests";
import UserShowPage from "./components/UserShowPage";


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      loading: true
    }

    this.getUser = this.getUser.bind(this);
    this.destroySession = this.destroySession.bind(this);
  }

  getUser() {
    User.current().then(currentUser => {
      if (currentUser) {
        this.setState({ currentUser, loading: false });
      }
      this.setState({ loading: false })
    });
  }

  destroySession() {
    Session.destroy()
      .then(()=>{
        this.setState({ currentUser: null });
      })
  }

  componentDidMount() {
    this.getUser();
  }

  render() {

    const { currentUser } = this.state;

    if (this.state.loading) {
      return( 
      <div className="App">
        <h1>Loading..</h1>
      </div>
      )
    }

    return (
      <BrowserRouter>
        <div className="App">
          <h1>Welcome!</h1>
          <NavBar currentUser={currentUser} onSignOut={this.destroySession}>

          </NavBar>
          <Switch>
            <Route path="/session/new" exact render={(routeProps)=><SignInPage {...routeProps} onSignIn={this.getUser} />} />
            <Route path="/leaderboards" exact component={LeaderBoardMain} />
            <Route path="/posts/:id" exact component={PostShowPage} />

            <Route path="/users/current" exact render={(routeProps)=><UserShowPage {...routeProps} currentUser={currentUser} />} />
            <Route path="/posts" exact render={(routeProps)=><PostIndexPage {...routeProps} currentUser={currentUser} />} />

          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
