import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import MonsterSubLayout from "./MonsterSubLayout";

const PrimaryLayout = () => (
  <div>
    <AppBar
      title="Eagle Lore"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <header>
      <ul>
        <li><Link to="/">Home</Link></li>
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
