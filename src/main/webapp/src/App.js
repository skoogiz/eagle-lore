import React, { Component } from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import logo from './logo.svg';
import './App.css';

const PrimaryLayout = () => (
  <div className="App">
    <AppBar
      title="Eagle Lore"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React World</h1>
    </header>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/users">Users</Link></li>
      <li><Link to="/monsters">Monsters</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <main className="App-intro">
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
      <Route path="/monsters" component={MonsterSubLayout} />
      <Route path="/about" component={AboutPage} />
    </main>
  </div>
);

const HomePage =() => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;
const AboutPage = () => <div>To get started, edit <code>src/App.js</code> and save to reload.</div>;

const BrowseMonstersPage = () => <div>Browse Monsters Page</div>;
const CreateMonsterPage = () => <div>Create Monster Page</div>;

const UserNav = ({ match }) => (
  <nav className="context-nav">
    <NavLink to={`${match.path}`} exact activeClassName="active">Browse</NavLink>
    <NavLink to={`${match.path}/create`} activeClassName="active">Create</NavLink>
  </nav>
);

const MonsterSubLayout = ({ match }) => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={`${match.path}`} exact component={BrowseMonstersPage} />
        <Route path={`${match.path}/create`} component={CreateMonsterPage} />
      </Switch>
    </div>
  </div>
)

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
);

export default App;
