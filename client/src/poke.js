import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class poke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      height: "",
      weight: "",
      species: "",
      sprites: [],
      abilities:[],
      moves: [],
      types: []
    };
  }

  setPictures(sprites)
  {
    //var SpritesKeys = Object.keys(sprites);
    var SpritesKeys = Object.values(sprites);
    var array2 = [];
    for(var i=0; i<SpritesKeys.length; i++){

      if(typeof SpritesKeys[i] === 'string'){
            if(SpritesKeys[i].includes('http'))
              array2.push(SpritesKeys[i]);
        }
    }
    return array2;
  }

  componentWillMount() {
    var url = (this.props.location.pathname).replace("/poke/", "");
    axios.get(url)
      .then((response) => {
        this.setState({
          name : response.data.name,
          weight : response.data.weight,
          height : response.data.height,
          species: response.data.species.url,
          abilities : response.data.abilities,
          moves : response.data.moves,
          types : response.data.types,
          sprites: response.data.sprites
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    let PokePic = this.setPictures(this.state.sprites).map(pic => {
        return <div className="col" key={ pic }><img  height="100" width="100" src={pic} />
        </div>
      });
    let PokeAbilities = this.state.abilities.map((abilitie) => {
      return <div className="col" key={ abilitie.ability.url }><h1><Link to={"/abilitie/" + abilitie.ability.url}>{ abilitie.ability.name }</Link></h1>
      </div>
    });

    let PokeMoves = this.state.moves.map((move) => {
      return <div className="col container poke" key={ move.move.url }><Link to={"/abilitie/" + move.move.url}>{ move.move.name }</Link>
      </div>
    });

   console.log(this.state.moves)

    return (
    <div className ="poke">
      <div className="container">
        <div className="row" >
          <div className="poke col-4" >
            <h1 className="text-primary" >Name:{"  " + this.state.name}</h1>
          </div>
          <div className="poke col-4">
            <h1 className="text-primary">Height:{"  " + this.state.height}</h1>
          </div>
          <div className="poke col-4">
            <h1 className="text-primary">Weight:{"  " + this.state.weight}</h1>
          </div>
        </div>
      </div>

        <div className="poke container">
          <div className="row" >
            <div className="col">
            <Link to={"/species/" + this.species}><h1>Species</h1></Link>
            </div>
          </div>
        </div>

        <div className="poke container">
          <div className="row">
              {PokePic}
          </div>
        </div>

      <div className="poke container">
        <div className="row">
          <div className="col">
            <h1 className="text-primary">Abilities</h1>
          </div>
            {PokeAbilities}
        </div>
      </div>

      <div className="poke container">
        <div className="row">
          <div className="col">
            <h1 className="text-primary">Learned Moves { " " + this.state.moves.length}</h1>
          </div>
        </div>
        <div className="row">
          {PokeMoves}
        </div>
      </div>

    </div>
    );

  }
}


export default poke;
