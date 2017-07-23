import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from './SignupForm'

class App extends Component {
  render() {
    return (
      <article className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Purposeful</h1>
          <h4>Democratizing the web through the free sharing of knowledge and great ideas
          </h4>
        </header>
      
        <section className="Signup-section">
          <SignupForm />
        </section>
      
      </article>
    );
  }
}

export default App;
