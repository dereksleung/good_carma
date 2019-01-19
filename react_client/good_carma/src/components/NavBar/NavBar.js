import React from "react";

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import "./navbar.css";

const NavBar = (props) => {

  const { currentUser } = props;

  const handleSignOutClick = event => {
    event.preventDefault();
    if (typeof props.onSignOut === "function") {
      props.onSignOut();
    }
  }

  return(
    <Navbar className="NavBar pb-2">

      <NavbarBrand className="mr-3 text-primary" exact to="/" tag={RRNavLink} id="Brand">
      Good Carma</NavbarBrand>
      <NavLink className="text-dark" exact to="/posts" tag={RRNavLink}>See Activity</NavLink>
      <NavLink className="text-dark" exact to="/leaderboards" tag={RRNavLink}>The LeaderBoards</NavLink>

        {currentUser ? (
        <>
        <NavLink className="text-dark" exact to="users/current" tag={RRNavLink}>{currentUser.full_name}</NavLink>
        <a href="#" className="text-dark" onClick={handleSignOutClick}>Sign Out</a>
        </> 
        ) : (
        <NavLink className="text-dark" exact to="/session/new" tag={RRNavLink}>
          Sign In
        </NavLink>
        )}

      <NavLink className="btn btn-secondary text-white" exact to="/sign_up/company" tag={RRNavLink}>Sign Up</NavLink>

    </Navbar>

  )
}

export default NavBar;

