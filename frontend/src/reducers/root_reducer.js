import { combineReducers } from "redux";
import players from "./players_reducer";

const RootReducer = combineReducers({
    players
});

export default RootReducer;