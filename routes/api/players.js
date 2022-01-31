const express = require("express");
const Player = require("../../models/Player");
const router = express.Router();

router.get("/", (req, res) => {
    Player
        .find()
        .then((players => res.json(players)))
        .catch(err => res.status(400).json(err))
})

router.post("/update/:id", (req, res) => {
    const newInfo = req.body;
    Player
        .findOneAndUpdate({_id : req.params.id}, newInfo,{
            new: true,
        })
        .then((player => res.json(player)))
        .catch(err => res.status(400).json(err))
})
module.exports = router;