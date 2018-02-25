import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MonsterNav from "../components/MonsterNav";
import BrowseMonstersPage from "../pages/BrowseMonstersPage";
import CreateMonsterPage from "../pages/CreateMonsterPage";

const MonsterSubLayout = () => (
  <div>
    <aside>
      <MonsterNav />
    </aside>
    <div>
      <Switch>
        <Route path="/monsters" exact component={BrowseMonstersPage} />
        <Route path="/monsters/create" component={CreateMonsterPage} />
        <Redirect to="/monsters" />
      </Switch>
    </div>
  </div>
);

export default MonsterSubLayout;
