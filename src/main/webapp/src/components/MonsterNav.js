import React from "react";
import { NavLink } from "react-router-dom";

const MonsterNav = () => (
  <nav>
    <NavLink to="/monsters" exact activeClassName="active">Browse</NavLink>
    <NavLink to="/monsters/create" activeClassName="active">Create</NavLink>
  </nav>
);

export default MonsterNav;
