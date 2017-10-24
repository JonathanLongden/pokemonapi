import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import Poke from './poke';


class pokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: []
    };
  }

  componentWillMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => {
        this.setState({
          pokemons: response.data.results
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let pokeItems = this.state.pokemons.map((pokemon) => {
      return <li className="list-group-item list-group-item-action list-group-item-success" key={ pokemon.url }><Link to={"/poke/" + pokemon.url}>{ pokemon.name }</Link>
      </li>
    });
    return (
      <div className="App">

        <div className="container-fluid">
          <header className="App-header container">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Pokemon Library React Page</h1>
          </header>
        </div>

        <div className="container">
          <div className="row">
            <div className="col">
            </div>
              <div className="col-6">
                <ul className="list-group">
                  { pokeItems }
                </ul>
              </div>
              <div className="col">
            </div>
          </div>
        </div>

      </div>
    );

  }
}
// <Poke />
export default pokeList;
