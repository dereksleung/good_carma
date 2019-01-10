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
    <Navbar className="NavBar pb-2 darken">

      <NavbarBrand className="mr-3 text-white" exact to="/" tag={RRNavLink} id="Brand">
      Good Carma</NavbarBrand>
      <NavLink className="text-white" exact to="/posts" tag={RRNavLink}>See Activity</NavLink>
      <NavLink className="text-white" exact to="/leaderboards" tag={RRNavLink}>The LeaderBoards</NavLink>

        {currentUser ? (
        <>
        <NavLink className="text-white" exact to="users/current" tag={RRNavLink}>{currentUser.full_name}</NavLink>
        <a href="#" class="text-white" onClick={handleSignOutClick}>Sign Out</a>
        </> 
        ) : (
        <NavLink className="text-white" exact to="/session/new" tag={RRNavLink}>
          Sign In
        </NavLink>
        )}

      <NavLink className="text-white" exact to="/sign_up" tag={RRNavLink}>Sign Up</NavLink>

    </Navbar>

  )
}

export default NavBar;

