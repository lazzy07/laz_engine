import React, { Component } from "react";
import ChooseScreen from "./screens/ChooseScreen";
import LoginDisplay from "./screens/display/LoginDisplay";
import MainControllerScreen from "./screens/controller/MainController";
import { Route, Switch } from "react-router-dom";
import * as Routes from "./routes";
import SelectTournament from "./screens/controller/SelectTounament";
import Monitor from "./screens/display/Monitor";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path={Routes.SELECTOR_URL}
            component={() => <ChooseScreen />}
          />
          <Route
            exact
            path={Routes.REGISTER_MONITOR}
            component={() => <LoginDisplay />}
          />
          <Route
            exact
            path={Routes.CONTROLLER}
            component={() => <MainControllerScreen />}
          />
          <Route
            exact
            path={Routes.SELECT_TOURNAMENT}
            component={() => <SelectTournament />}
          />
          <Route
            exact
            path={Routes.MONITOR_DISPLAY}
            component={() => <Monitor />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
