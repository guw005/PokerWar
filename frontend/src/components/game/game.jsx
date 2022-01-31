import React from 'react';
import { withRouter } from 'react-router-dom';
import Player from '../players/player';
import Deck from "../deck";
import "./game.css"
import Card from "../card"
import ultronPic from './ultron.png';
import visionPic from './vision.png';

const CARD_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

class Game extends React.Component {
    constructor(props){
        super(props);

        this.deck = new Deck();
        //test the end of the game by commenting out the line above and use the deck bellow
        // this.deck = new Deck([new Card("♥", "4"), new Card("♥", "4"), new Card("♥", "J")])


        this.deck.shuffle();
        let mid = Math.floor(this.deck.deck.length / 2);
        this.ultronDeck = this.deck.deck.slice(0, mid);
        this.visionDeck = this.deck.deck.slice(mid);
        this.warDeck = [];
        this.isWar = false;
        this.gameOver = false;

        this.state = {
            ultronDeckCount: this.ultronDeck.length,
            visionDeckCount: this.visionDeck.length,
            ultronHand: null,
            visionHand: null,
            warDeckCount: this.warDeck.length,
            currentWinner: null,
            gameWinner: null,
        }

        this.deal = this.deal.bind(this);
        this.war = this.war.bind(this);
        this.updateCurrentWinner = this.updateCurrentWinner.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderWarDeck = this.renderWarDeck.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.updateGameWinner = this.updateGameWinner.bind(this);
        this.renderCurrentWinner = this.renderCurrentWinner.bind(this);
        this.renderGameWinner = this.renderGameWinner.bind(this);
        this.renderUltronHand = this.renderUltronHand.bind(this);
        this.renderVisionHand = this.renderVisionHand.bind(this);
    }


    componentDidMount(){
        this.props.fetchPlayers();
    }

    deal(){
        const ultronCard = this.ultronDeck.shift();
        const visionCard = this.visionDeck.shift();
        const ultronHand = [ultronCard.suit, ultronCard.value];
        const visionHand = [visionCard.suit, visionCard.value];
        let ultronDeckCount = this.ultronDeck.length;
        let visionDeckCount = this.visionDeck.length;


        this.setState({ ultronHand, visionHand, ultronDeckCount, visionDeckCount })
        setTimeout(() => {
            this.compare(ultronCard, visionCard)
        }, 2000)
    }

    compare(ultronCard, visionCard){
        const ultronValue = ultronCard.value;
        const visionValue = visionCard.value;
        let ultronDeckCount = this.state.ultronDeckCount;
        let visionDeckCount = this.state.visionDeckCount;
        let warDeckCount = this.state.warDeckCount;
        let currentWinner = this.state.currentWinner;

        if(CARD_MAP[ultronValue] > CARD_MAP[visionValue]){
            this.ultronDeck.push(visionCard);
            this.ultronDeck.push(ultronCard);
            while(this.warDeck.length){
                this.ultronDeck.push(this.warDeck.pop());
            }
            ultronDeckCount = this.ultronDeck.length;
            visionDeckCount = this.visionDeck.length;
            warDeckCount = this.warDeck.length;
            currentWinner = this.props.ultron;
            this.isWar = false;

            this.updateCurrentWinner(currentWinner);

            this.setState({
                ultronHand: null,
                visionHand: null,
                ultronDeckCount, 
                visionDeckCount, 
                warDeckCount,
                currentWinner: currentWinner.name
            })

            this.checkWin();

        }else if(CARD_MAP[ultronValue] < CARD_MAP[visionValue]){
            this.visionDeck.push(ultronCard);
            this.visionDeck.push(visionCard);
            while(this.warDeck.length){
                this.visionDeck.push(this.warDeck.pop());
            }
            ultronDeckCount = this.ultronDeck.length;
            visionDeckCount = this.visionDeck.length;
            currentWinner = this.props.vision;
            warDeckCount = this.warDeck.length;
            this.isWar = false;

            this.updateCurrentWinner(currentWinner);

            this.setState({
                ultronHand: null,
                visionHand: null,
                ultronDeckCount, 
                visionDeckCount, 
                warDeckCount,
                currentWinner: currentWinner.name
            })

            this.checkWin();
        }else{
            this.isWar = true;
            this.warDeck.push(ultronCard, visionCard);
            warDeckCount = this.warDeck.length;
            currentWinner = "TIE";

            this.setState({
                ultronHand: null,
                visionHand: null,
                currentWinner,
                warDeckCount
            })

            this.checkWin();
            if(this.ultronDeck.length !== 0 && this.visionDeck.length !== 0){
                setTimeout(this.war, 2000)
            }
            
            
        }
    }



    war(){
        const ultronCard = this.ultronDeck.shift();
        const visionCard = this.visionDeck.shift();
        const ultronHand = [ultronCard.suit, ultronCard.value];
        const visionHand = [visionCard.suit, visionCard.value];


        

        if(this.ultronDeck.length > 0 && this.visionDeck.length > 0){
            this.warDeck.push(this.ultronDeck.shift(), this.visionDeck.shift());
        }
        let warDeckCount = this.warDeck.length;
        this.setState({ ultronHand, visionHand, warDeckCount})

        setTimeout(() => {
            this.compare(ultronCard, visionCard)
        }, 2000)
        
    }

    checkWin(){
        let gameWinner;
        if(this.ultronDeck.length === 0 && this.visionDeck.length !== 0){
            this.gameOver = true;
            gameWinner = this.props.vision;
            this.updateGameWinner(gameWinner);
            this.setState({
                gameWinner: gameWinner.name
            })
        }else if(this.visionDeck.length === 0 && this.ultronDeck.length !== 0 ){
            this.gameOver = true;
            gameWinner = this.props.ultron;
            this.updateGameWinner(gameWinner);
            this.setState({
                gameWinner: gameWinner.name
            })
        }else if(this.ultronDeck.length === 0 && this.visionDeck.length === 0){
            this.gameOver = true;
            gameWinner = {name: null};
            this.setState({
                gameWinner: gameWinner.name
            })
        }


        
    }

    updateCurrentWinner(player){
        this.props.patchPlayer(player._id, {win: player.win + 1})
    }
    updateGameWinner(player){
        this.props.patchPlayer(player._id, {gamewon: player.gamewon + 1})
    }



    renderWarDeck(){
        if(this.isWar){
            return(
                <div className='war-deck-container'>
                    <div className='text-container'>
                        <span>War Deck:</span>
                    </div>
                    <div className='war-deck-count-container'>
                        <span>{this.state.warDeckCount}</span>
                    </div>
                </div>
            )
        }
    }
    
    renderButton(){
        if(this.gameOver){
            return(
                <div className='new-game-button' onClick={this.refreshPage}>NEW GAME</div>
            )
        }else{
            if(this.isWar){
                return(
                    <span>WAR!!!!</span>
                )
            }else{
                return(
                    <div className='deal-button' onClick={this.deal}>DEAL</div>
                )
            }
        }


    }

    renderGameWinner(){
        if((this.gameOver) && (this.state.gameWinner === null)){
            return(
                <div className='game-over-container'>
                    <div>
                        <span>GAME OVER</span>
                    </div>
                    <div>
                         <span className='game-result'>It's a tie!</span>
                    </div>
                </div>
            )
        }else if(this.gameOver && this.state.gameWinner !== null){
            return(
                <div className='game-over-container'>
                    <div>
                        <span>GAME OVER!</span>
                    </div>
                    <div>
                        <span className='game-result'>{this.state.gameWinner} is the Winner</span>
                    </div>
                </div>
            )
        }
    }

    renderCurrentWinner(){
        if(this.state.currentWinner === "Ultron" ||this.state.currentWinner === "Vision"){
            return(
                <div className={`current-${this.state.currentWinner}-winner`}>
                    <span>{this.state.currentWinner} is the winner of this round</span>
                </div>
            )
        }
    }

    renderUltronHand(){
        if(this.state.ultronHand){
            return(
                <div className='card'>
                    <div className='card-value'>
                        <span>{this.state.ultronHand[1]}</span>
                    </div>
                    <div className='card-suit'>
                        <span>{this.state.ultronHand[0]}</span>
                    </div>
                </div>
            )
        }
    }

    renderVisionHand(){
        if(this.state.visionHand){
            return(
                <div className='card'>
                    <div className='card-value'>
                        <span>{this.state.visionHand[1]}</span>
                    </div>
                    <div className='card-suit'>
                        <span>{this.state.visionHand[0]}</span>
                    </div>
                </div>
            )
        }
    }
    refreshPage(){
        window.location.reload(false);
    }

    render(){
        return(
            <div className='main-page'>
                <div className='players-container'>
                    <div>
                        <img src={ultronPic} className="ultron-logo" alt="ultron" />
                    </div>
                    {this.props.players.map(player => (
                        <Player
                            key = {player._id}
                            player = {player}
                        />
                    ))}
                    <div>
                        <img src={visionPic} className="vision-logo" alt="vision" />
                    </div>
                </div>

                <div className='game-container'>
                    <div className='deck-container'>
                        <div className = 'deck'>
                            <span>{this.state.ultronDeckCount}</span>
                        </div>
                    </div>
                    <div className='card-container'>
                        
                            
                        {this.renderUltronHand()}
                        
                    </div>
                    
                    
                    <div className='deal-button-container'>{this.renderButton()}</div>
                    <div className='card-container'>
                        {this.renderVisionHand()}
                    </div>
                    
                    <div className='deck-container'>
                        <div className='deck'>
                            <span>{this.state.visionDeckCount}</span>
                        </div>
                    </div>
                    
                </div>
                <div className='lower-area'>
                    <div className='current-winner-container'>{this.renderCurrentWinner()}</div>
                </div>
                {this.renderWarDeck()}
                {this.renderGameWinner()}
                
            </div>
        )
    }
}

export default withRouter(Game);