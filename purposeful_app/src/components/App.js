import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from './SignupForm';
import NavBar from './NavBar';

class App extends Component {
  constructor () {
    super();
    this.state = {
      first: '',
      last: '',
      email: '',
    };
  }

  handleClick() {
    alert("Signup not implemented, but thanks for trying!");
  }

  render() {
    return (
      <section className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
        </header>

        <nav>
          <NavBar />
        </nav>

        <article className="Signup-section">

        <h1>Welcome to Purposeful!</h1>
          <h4>Democratizing the web through the free sharing of knowledge and great ideas.
          </h4>
          <SignupForm onClick={() => this.handleClick()} />
        </article>
      
      </section>
    );
  }
}

export default App;
