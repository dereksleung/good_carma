import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import SearchBar from "../SearchBar";
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
    <Navbar className="NavBar pb-2 d-flex">
      <div className="d-flex flex-grow-4 align-items-center">
        <NavbarBrand className="mr-3 text-primary" exact to="/" tag={RRNavLink} id="Brand">
        Good Carma</NavbarBrand>
        <NavLink className="text-dark" exact to="/posts" tag={RRNavLink}>See Activity</NavLink>
        <NavLink className="text-dark" exact to="/leaderboards" tag={RRNavLink}>The LeaderBoards</NavLink>
        <SearchBar/>
      </div>
      <div id="nav-right" className="d-flex flex-grow-1 justify-content-end">
        {currentUser ? (
        <>
        <NavLink className="text-dark" exact to={`users/${currentUser.slug}`} tag={RRNavLink}>{currentUser.full_name}</NavLink>
        <a href="#" id="sign-out-btn" className="text-dark align-self-center mr-2" onClick={handleSignOutClick}>Sign Out</a>
        </> 
        ) : (
        <NavLink className="text-dark" exact to="/session/new" tag={RRNavLink}>
          Sign In
        </NavLink>
        )}

        <NavLink className="btn btn-secondary text-white" exact to="/sign_up/company" tag={RRNavLink}>Sign Up</NavLink>
      </div>

    </Navbar>

  )
}

export default NavBar;

