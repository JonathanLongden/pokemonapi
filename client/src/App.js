import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import './App.css';
import Pokelist from './pokelist';
import Poke from './poke';



class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Pokelist}/>
          <Route path="/poke/:id" component={Poke}/>
      </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;


