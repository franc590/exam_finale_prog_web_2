const express = require("express");
const router = express.Router();


router.get("/", (requete, reponse) => {
    reponse.render("index", {
    })});

router.get("/index", (requete, reponse) => {
    reponse.render("index", {
    })});

module.exports = router;