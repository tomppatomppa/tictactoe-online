<h1 align="center">
  <br>
  Tic-Tac-Toe-Online
  <br>
</h1>

<h4 align="center">This project features both online and offline gameplay options, allowing you to play against friends or the computer. The game is built using modern web technologies and is fully responsive, making it easy to play on any device. <a href="https://nodejs.org/en" target="_blank">Node.js</a>, <a href="https://react.dev/" target="_blank">React</a>, <a href="https://socket.io/" target="_blank">Socket.io</a>, <a href="https://tanstack.com/" target="_blank">React Query</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#limitations">Limitations</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#description">Description</a> •
  <a href="#features">New Features</a> •
  <a href="#license">License</a>
</p>

<p align="center">
 <img src="tictactoe.gif" />
</p>

## Key Features

- Online Multiplayer Support
- Realtime updates and gameplay
- Display number connected players in a game
- Play offline agains "Ai"
- Leaderboard
- Customizable gridsize
- Create, Join, Delete Games
- Quick Rematch Functionality for both online and offline
- Replay Old Games
- Custom DataDrid component
- Custom Grid Component
- Error Messages

## limitations

- Offline games are not saved
- There might be some bugs with the socket connections, and lacks any manual refresh functionality

## How To Use

> **Note**
> For Windows only

```bash

# Clone this repository
$ git clone https://github.com/tomppatomppa/tictactoe-online.git

# Go to server folder
$ cd tictactoe-online/server

# Connect a database
# Create a .env file in the server folder with the following contents
# Tested with https://api.elephantsql.com/ free plan
$ DATABASE_URL="connectionstring"
$ SECRET=secret

# Install dependencies
$ npm install

# Create a client build and start server on port 3001
# Or run the client seperately by going to /client folder and run npm start
$ npm run build:dev

# Open browser
$ http://localhost:3001/
```

## Run Server Tests

> **Note**
> For Windows only

```bash
# Go to server folder
$ cd ./server

# Disable io.listen(4000) in app.js
# Otherwise it will throw EADDRINUSE error
$ //io.listen(4000)

# Run Server tests
# On a free Database plan you might get "SequelizeConnectionError: too many connections for role xxxxx" error
$ npm run test

```

## Run Client Tests

> **Note**
> For Windows only

```bash
# Go to client folder
$ cd ./client

# Run client tests
$ npm test

```

## Description

This repository is dedicated to helping me gain a deeper understanding of WebSocket technologies, specifically sockets.io. To achieve this goal, I created a real-time gaming functionality for a tic-tac-toe game. The client-side of the application is built with custom React components that can be easily reused throughout the app.

Currently, both the backend and client share some of the "game logic," which isn't ideal. However, since only online games are saved, validating all offline games in the backend would have been unnecessary.

My primary focus was to ensure that no mutations were made to the database via sockets. Instead, mutations were only permitted through the API, which requires authentication. Sockets were primarily used for retrieving the initial state of a game and informing clients of any updates.

In retrospect, I realize that I should have focused on creating tests from the beginning and made everything testable from the start. Refactoring after completing a project can be a challenging task, especially for junior developers. It's difficult to anticipate problems ahead of time, so sometimes you just have to "wing it" and hope for the best.

## DataGrid Component

My goal was to create some kind of "gamelobby" that receives updates in realtime, and has an "action" button that can be customized based on the data that exists in the grid. It does what its suppose to do, maybe the implementation is a bit clucky in places especially when passing the "entity" prop for customized behaviour.

Lets say we received an array of game items:

```ruby
const gameArray = [ {"id": 1, "player1": 1, "player2": 2 }, {..etc}]

const headers= {
    id: "id",
    player1: "player1"
    player2: "player2"
}

<DataGrid headers={headers}, data={gameArray} />

Expected output:

|id|player1|player2|
| 1|      1|      2|

```

Say I want to add a button "MyGame" for all games where player1 == 1.

I would have to pass two extra props, entity and onClick.

```ruby

const headers= {
    id: "id",
    player1: "player1"
    player2: "player2"
}

const playButton = {
  target: ['player1'], #target a field in the headers
  match: [1],          #specify what value is a valid match
  text: 'MyGame',      #button text
  dispatch: ['id'],    #what value to dispatch when clicked
  type: 'mygame',      #specify a type field
  style: buttonStyle,  #custom style for button
}

const mybuttons = [playButton, ...]

<DataGrid headers={headers}, data={gameArray} entity={myButtons} onClick={onClickFunction} />

Expected output:

|id|player1|player2|   action|
| 1|      1|      2| MyButton|


```

OnClick would dispatch {type: "mygame", data: {id: 1} as specified in the playButton object.

## Features to be implemented

- Support for different games
- Show online players outside of a gameRoom
- Improve DataGrid with filtering, challenge users etc..
- 3D GridTiles

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/en)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [ReactQuery](https://tanstack.com/)
- [Tailwind](https://tailwindcss.com/)

## Live Website

[tic-tac-toe-online](https://tictactoe-online.fly.dev/) - A Working Version Hosted On Fly.io

## License

MIT

---

> GitHub [@tomppatomppa](https://github.com/tomppatomppa) &nbsp;&middot;&nbsp;
