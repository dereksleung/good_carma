import React, { Component } from 'react';
import PostIndexPage from "./components/PostIndexPage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PostShowPage from "./components/PostShowPage";
import NavBar from "./components/NavBar/NavBar";
import LeaderBoardMain from "./components/LeaderBoardMain";
import { User, Session, Follow } from "./requests";
import OtherLeaderboard from "./components/OtherLeaderboard";
import Tree from "./components/Tree/Tree";


import WelcomePage from "./components/WelcomePage/WelcomePage";
import volunteers from "./components/WelcomePage/volunteers.jpeg";
import AuthnRoute from "./components/AuthnRoute";


import './App.css';
import CurrentUser from './components/CurrentUser';
import UserShowPage from './components/UserShowPage';
import UserSignUpPage from './components/SignUpPage/UserSignUpPage';
import UserConfirmPage from './components/UserConfirmPage/UserConfirmPage';
import UserList from "./components/UserList";
import SearchResults from './components/SearchResults';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {id: 0},
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
        <div className="App" style={{
            backgroundImage: `url(${volunteers}), linear-gradient(0deg, rgba(8,174,234,1) 0%, rgba(42,245,152,1) 100%), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
            backgroundBlendMode: "multiply",
            backgroundRepeat:"no-repeat",
            backgroundAttachment:"fixed",
            backgroundPosition:"center",
            position: "relative"
          }}>
          <NavBar currentUser={currentUser} onSignOut={this.destroySession}>

          </NavBar>
          <section className="background-splash" >
            <Switch>
              <Route path="/" exact component={WelcomePage} />
              <Route path="/sign_up/company" exact render={(routeProps)=><SignUpPage />} />
              <Route path="/sign_up/user" exact render={(routeProps)=><UserSignUpPage/>} />
              <Route path="/search" exact render={(routeProps=><SearchResults {...routeProps} />)} />
              <Route path="/users/:id/confirmation" exact render={(routeProps)=><UserConfirmPage {...routeProps} />} />
              <Route path="/users/:id/followers" exact render={(routeProps)=><UserList loadUsers={Follow.showFollowers} {...routeProps} listType={"Followers"} />} />
              <Route path="/users/:id/followed_users" exact render={(routeProps)=><UserList loadUsers={Follow.showFollowedUsers} {...routeProps} listType={"Followings"} />} />
              <Route path="/session/new" exact render={(routeProps)=><SignInPage {...routeProps} onSignIn={this.getUser} />} />
              <Route path="/leaderboards" exact component={LeaderBoardMain} />
              <Route path="/leaderboards/show" exact render={(routeProps)=><OtherLeaderboard {...routeProps} />} />
              
              <Route path="/posts/:id/tree" exact render={(routeProps)=><Tree  {...routeProps} currentUser={currentUser} />} />
              <Route path="/posts/:id" exact component={PostShowPage} />

              <Route path="/users/current" exact render={(routeProps)=><CurrentUser {...routeProps} currentUser={currentUser} />} />
              <Route path="/users/:id" exact render={(routeProps)=><UserShowPage {...routeProps} currentUser={currentUser} />} />

              <Route path="/posts" exact render={(routeProps)=><PostIndexPage {...routeProps} currentUser={currentUser} />} />

            </Switch>
          </section>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
