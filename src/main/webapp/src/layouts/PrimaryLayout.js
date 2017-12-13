import React from "react";
import { Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import MonsterSubLayout from "./MonsterSubLayout";

const NavBar = withRouter(({ history }) => (
  <AppBar
    title="Eagle Lore"
    onTitleClick={() => { history.push("/"); }}
    showMenuIconButton={false}
  >
    <ul>
      <li><Link to="/monsters">Monsters</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </AppBar>
));

const PrimaryLayout = () => (
  <div>
    <NavBar />
    <header>
      <ul>
        <li><Link to="/monsters">Monsters</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </header>
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
