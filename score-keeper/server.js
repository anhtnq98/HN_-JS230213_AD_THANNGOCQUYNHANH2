const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

server.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/html/index.html`);
});

server.get("/round/:id", (req, res) => {
  res.sendFile(`${__dirname}/public/html/round.html`);
});

server.get("/round", (req, res) => {
  //   let { id } = req.params;
  let rounds = JSON.parse(fs.readFileSync(`./data-api/rounds.json`));
  try {
    // let findRoundById = rounds.find((e, i) => e.id === +id);
    if (rounds) {
      res.status(200).json(rounds);
    } else {
      res.status(404).json({
        messesge: `Không tìm thấy dữ liệu`,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

server.get("/round/:id", (req, res) => {
  let { id } = req.params;
  let rounds = JSON.parse(fs.readFileSync(`./data-api/rounds.json`));
  try {
    let findRoundById = rounds.find((e, i) => e.id === +id);
    if (findRoundById) {
      res.status(200).json(findRoundById);
    } else {
      res.status(404).json({
        messesge: `Không tìm thấy dữ liệu`,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

server.post(`/`, (req, res) => {
  let rounds = JSON.parse(fs.readFileSync(`./data-api/rounds.json`)) || [];
  if (rounds) {
    const newId = Math.floor(Math.random() * 1000000000000);
    const { playerNameOne, playerNameTwo, playerNameThree, playerNameFour } =
      req.body;
    const newRound = {
      id: newId,
      roundID: Math.floor(Math.random() * 1000000000000),
      roundNumber: 0,
      playerOne: {
        playerId: Math.floor(Math.random() * 100000000000),
        playerNameOne,
        playerOneScore: 0,
      },
      playerTwo: {
        playerId: Math.floor(Math.random() * 100000000000),
        playerNameTwo,
        playerTwoScore: 0,
      },
      playerThree: {
        playerId: Math.floor(Math.random() * 100000000000),
        playerNameThree,
        playerThreeScore: 0,
      },
      playerFour: {
        playerId: Math.floor(Math.random() * 100000000000),
        playerNameFour,
        playerFourScore: 0,
      },
    };

    try {
      rounds.push(newRound);
      fs.writeFile(`./data-api/rounds.json`, JSON.stringify(rounds), (err) => {
        if (err) throw err;
        res.status(201).json({
          messege: "Create successfully",
        });
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});

server.post(`/round/:id`, (req, res) => {
    let rounds = JSON.parse(fs.readFileSync(`./data-api/rounds.json`)) || [];
    if (rounds) {
        
    }
})

server.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
