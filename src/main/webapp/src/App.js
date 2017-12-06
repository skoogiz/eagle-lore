import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
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
      <li><Link to="/about">About</Link></li>
    </ul>
    <main className="App-intro">
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
      <Route path="/about" component={AboutPage} />
    </main>
  </div>
);

const HomePage =() => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;
const AboutPage = () => <div>To get started, edit <code>src/App.js</code> and save to reload.</div>;

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
);

export default App;
