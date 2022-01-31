import { RECEIVE_PLAYERS, RECEIVE_PLAYER } from "../actions/player_actions";

const PlayersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type){
        case RECEIVE_PLAYERS:
            action.players.data.forEach((player) => {
                newState[player._id] = player
            })
            return newState;
        case RECEIVE_PLAYER:
            const player = action.player.data;
            newState[player._id] = player;
            return newState;
        default:
            return state;
    }
}

export default PlayersReducer