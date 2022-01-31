import React from "react";
import { Switch, Route} from "react-router-dom";
import GameContainer from "./game/game_container";
import "./reset.css";

const App = () => (
    <div className="app-container">
        <Switch>
            <Route exact path="/" component = {GameContainer} />
        </Switch>
    </div>
);

export default App