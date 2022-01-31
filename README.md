# Poker War App
## by Guanyao Wang

The website is being Hosted on http://peaceful-beach-62138.herokuapp.com/#/

## Technologies
- MongoDB
- Express.js
- React.js
- Node.js
- Heroku

## Start the game
The total numbers of winning rounds and winning games are shown next to the player pics.

Click on deal to deal one card to each player(Ultron & Vision). After the comparing the value, the player's deck number will be upadted and the number of winnig rounds will also be updated.

## War process
When the hand cards have same value, the war process will begin. A war deck will appear on the page showing the number of facedown cards that will eventually push to bottom of winner's deck.

The deal button during the war process will become a string saying "WAR!!!".

## Game ends
When one of the players has no more cards in its deck, the game will end and the player who has all the cards is the winner.

A game over sign will be shown with a string indicating who's the winner and the number of winning games will be updated.

## More tests
You also can pull the repo to local directory to test more cases. Feel free to comment out the this.deck = new Deck() line in game component(./frontend/src/game/game.jsx) and substitute it with the line below, which will create a deck with only three cards. It'll make it easier to test the game ending and winner checking feature and also the war process.

## instruction to start local server
- cd into the pokerwar folder
- npm install
- npm run server
- open another terminal in vscode
- cd into the frontend folder
- npm install
- npm start

the last step will automatically open a localhost link in your browser, if not, go to your browser and type in http://localhost:3000/

You can also check out the redux logger in Chrome's developer console.