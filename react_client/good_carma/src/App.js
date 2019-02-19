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
import UserResults from './components/UserResults';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: "",
      loading: true
    }

    this.getUser = this.getUser.bind(this);
    this.destroySession = this.destroySession.bind(this);

    this.majorBackgroundStyle = {
      backgroundImage: `url(${volunteers}), linear-gradient(0deg, rgba(8,174,234,1) 0%, rgba(42,245,152,1) 100%), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
      backgroundBlendMode: "multiply",
      backgroundRepeat:"no-repeat",
      backgroundAttachment: "fixed",
      backgroundPosition:"center",
      position: "relative",
      minHeight: "100vh"
    }
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
          <NavBar currentUser={currentUser} onSignOut={this.destroySession}/>
            <Switch>
              <Route path="/" exact render={(routeProps)=><WelcomePage {...routeProps} bground={this.majorBackgroundStyle}/>} />
              <section style={this.majorBackgroundStyle}>
                <Route path="/sign_up/company" exact render={(routeProps)=><SignUpPage bground={this.majorBackgroundStyle}/>} />
                <Route path="/sign_up/user" exact render={(routeProps)=><UserSignUpPage bground={this.majorBackgroundStyle}/>} />
                <Route path="/search" exact render={(routeProps=><UserResults {...routeProps} bground={this.majorBackgroundStyle}/>)} />
                <Route path="/users/:id/confirmation" exact render={(routeProps)=><UserConfirmPage {...routeProps} bground={this.majorBackgroundStyle}/>} />
                <Route path="/users/:id/followers" exact render={(routeProps)=><UserList loadUsers={Follow.showFollowers} {...routeProps} listType={"Followers"} bground={this.majorBackgroundStyle}/>} />
                <Route path="/users/:id/followed_users" exact render={(routeProps)=><UserList loadUsers={Follow.showFollowedUsers} {...routeProps} listType={"Followings"} bground={this.majorBackgroundStyle}/>} />
                <Route path="/session/new" exact render={(routeProps)=><SignInPage {...routeProps} onSignIn={this.getUser} bground={this.majorBackgroundStyle}/>} />
                <Route path="/leaderboards" exact render={(routeProps)=><LeaderBoardMain {...routeProps} bground={this.majorBackgroundStyle} bground={this.majorBackgroundStyle}/>} />
                <Route path="/leaderboards/show" exact render={(routeProps)=><OtherLeaderboard {...routeProps} bground={this.majorBackgroundStyle}/>} />
                
                <Route path="/posts/:id/tree" exact render={(routeProps)=><Tree  {...routeProps} currentUser={currentUser} bground={this.majorBackgroundStyle}/>} />
                <Route path="/posts/:id" exact render={(routeProps)=><PostShowPage {...routeProps} bground={this.majorBackgroundStyle} bground={this.majorBackgroundStyle}/>} />

                <Route path="/users/current" exact render={(routeProps)=><CurrentUser {...routeProps} currentUser={currentUser} bground={this.majorBackgroundStyle}/>} />
                <Route path="/users/:id" exact render={(routeProps)=><UserShowPage {...routeProps} currentUser={currentUser} bground={this.majorBackgroundStyle}/>} />

                <Route path="/posts" exact render={(routeProps)=><PostIndexPage {...routeProps} currentUser={currentUser} bground={this.majorBackgroundStyle}/>} />`
              </section>
            </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
