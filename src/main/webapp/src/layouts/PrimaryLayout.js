import React from "react";
import { Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import MonsterSubLayout from "./MonsterSubLayout";
import "./PrimaryLayout.css";

const NavBar = withRouter(({ history }) => (
  <AppBar
    title={<span className="title">Eagle Lore</span>}
    onTitleClick={() => { history.push("/"); }}
    showMenuIconButton={false}
  >
    <nav className="navbar">
      <Link to="/monsters">Monsters</Link>
      <Link to="/about">About</Link>
    </nav>
  </AppBar>
));

const PrimaryLayout = () => (
  <div>
    <NavBar />
    <main>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/monsters" component={MonsterSubLayout} />
        <Route path="/about" component={AboutPage} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
);

export default PrimaryLayout;
