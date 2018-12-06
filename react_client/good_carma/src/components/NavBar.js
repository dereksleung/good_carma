import React from "react";

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

const NavBar = (props) => {

  const { currentUser } = props;

  const handleSignOutClick = event => {
    event.preventDefault();
    if (typeof props.onSignOut === "function") {
      props.onSignOut();
    }
  }

  return(
    <Navbar className="NavBar mb-4">

      <NavbarBrand className="mr-3" exact to="/" tag={RRNavLink} id="Brand">
      Good Carma</NavbarBrand>
      <NavLink exact to="/posts" tag={RRNavLink}>See Activity</NavLink>
      <NavLink exact to="/leaderboards" tag={RRNavLink}>The LeaderBoards</NavLink>

        {currentUser ? (
        <>
        <NavLink exact to="users/current" tag={RRNavLink}>{currentUser.full_name}</NavLink>
        <a href="#" onClick={handleSignOutClick}>Sign Out</a>
        </> 
        ) : (
        <NavLink exact to="/session/new" tag={RRNavLink}>
          Sign In
        </NavLink>
        )}

    </Navbar>
  )
}

export default NavBar;

