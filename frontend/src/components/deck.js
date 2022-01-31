import Card from "./card";
const SUITS = ["♥", "♦", "♠", "♣"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export default class Deck{
    constructor(deck = freshDeck()){
        this.deck = deck;
    }

    shuffle(){
        for(let i = this.deck.length - 1; i >= 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.deck[j];
            this.deck[j] = this.deck[i];
            this.deck[i] = temp;
        }
    }
}

function freshDeck(){
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}