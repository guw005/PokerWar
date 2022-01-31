import { getPlayers, updatePlayer } from "../util/player_api_util";

export const RECEIVE_PLAYERS = "RECEIVE_PLAYERS";
export const RECEIVE_PLAYER = "RECEIVE_PLAYER";

export const receivePlayers = players => ({
    type: RECEIVE_PLAYERS,
    players
});

export const receivePlayer = player => ({
    type: RECEIVE_PLAYER,
    player
});

export const fetchPlayers = () => dispatch => (
    getPlayers()
        .then(players => dispatch(receivePlayers(players)))
        .catch(err => console.log(err))
);

export const patchPlayer = (id, userInfo) => dispatch => (
    updatePlayer(id, userInfo)
        .then(player => dispatch(receivePlayer(player)))
        .catch(err => console.log(err))
);