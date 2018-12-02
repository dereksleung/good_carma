import React from "react";

import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  return(
    <nav className="NavBar">
      <NavLink exact to="/">
      Welcome</NavLink>
      <NavLink exact to="/posts">See Activity</NavLink>
    </nav>
  )
}

export default NavBar;

