import React, { Component } from "react";
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import SearchBar from "../SearchBar";
import "./navbar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  handleSignOutClick(event) {
    event.preventDefault();
    if (typeof this.props.onSignOut === "function") {
      this.props.onSignOut();
    }
  }

  toggleNav() {
    this.setState({open: !this.state.open})
  }

  render() {

    const { currentUser } = this.props;
    return(
      <Navbar className="NavBar pb-2 d-flex" expand="md">
        <div className="d-flex flex-grow-4 align-items-center">
          <NavbarBrand className="mr-3 text-primary" exact to="/" tag={RRNavLink} id="Brand">
          Good Carma</NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.open} navbar>
            <Nav>
              <NavItem>
                <NavLink className="text-dark" exact to="/posts" tag={RRNavLink}>See Activity</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-dark" exact to="/leaderboards" tag={RRNavLink}>Leaderboards</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-dark" exact to="/quests" tag={RRNavLink}>Quests</NavLink>
              </NavItem>
              <SearchBar/>
            </Nav>
          </Collapse>
         
        </div>
        <div id="nav-right" className="d-flex flex-grow-1 justify-content-end">
          {currentUser ? (
          <>
            <NavLink className="text-dark" exact to={`/users/${currentUser.slug}`} tag={RRNavLink}>{currentUser.full_name}</NavLink>
            <a href="/#" id="sign-out-btn" className="text-dark align-self-center mr-2" onClick={this.handleSignOutClick}>Sign Out</a>
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
}

export default NavBar;

