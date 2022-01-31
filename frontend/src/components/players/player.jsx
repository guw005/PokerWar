import React from "react";
import "./player.css";
// import { withRouter } from "react-router-dom";

const Player = ({player}) => {
    return (
        <div className="player-container">
            <span className="player-info" id="player-name">{player.name}</span>
            <span className="player-info">Total # of rounds won: {player.win}</span>
            <span className="player-info">Total # of games won: {player.gamewon}</span>
        </div>
    )
};

export default Player;