import React, { Component } from 'react';
import {Navbar, NavItem} from "react-materialize"
import { Route, Switch } from "react-router-dom";
import CurrentMatch from './screens/CurrentMatch';
import {withRouter} from "react-router-dom"
import Matches from './screens/Matches';
import Players from './screens/Players';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar className="teal" brand="Pera 6s 2k19" left>
          <NavItem onClick={() => this.props.history.push("/")}>Home</NavItem>
          <NavItem onClick={() => this.props.history.push("/matches")}>Matches</NavItem>
          <NavItem onClick={() => this.props.history.push("/players")}>Players</NavItem>
        </Navbar>
        <Switch>
          <Route exact path={"/"} component={CurrentMatch}/>
          <Route exact path={"/matches"} component={Matches}/>
          <Route exact path={"/players"} component={Players}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
