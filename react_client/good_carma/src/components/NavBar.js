import React from "react";

import { NavLink } from "react-router-dom";

const NavBar = (props) => {

  const { currentUser } = props;

  const handleSignOutClick = event => {
    event.preventDefault();
    if (typeof props.onSignOut === "function") {
      props.onSignOut();
    }
  }

  return(
    <nav className="NavBar">
      <NavLink exact to="/">
      Welcome</NavLink>
      <NavLink exact to="/posts">See Activity</NavLink>
      <NavLink exact to="/leaderboards">The LeaderBoards</NavLink>
      {currentUser ? (
      <>
      <NavLink exact to="users/current">{currentUser.full_name}</NavLink>
      <a href="#not-used" onClick={handleSignOutClick}>Sign Out</a>
      </> 
      ) : (
      <NavLink exact to="/session/new">
        Sign In
      </NavLink>
      )}
    </nav>
  )
}

export default NavBar;

