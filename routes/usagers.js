const express = require("express");
const router = express.Router();
const passport = require('passport');


router.get("/", (requete, reponse) => {
    reponse.render("login", {
    })});


router.get('/logout', (requete, reponse, next) => {
        requete.logout(((err)=>{
            if (err) {
                return next(err);
            }
            requete.flash('success_msg', 'Vous êtes déconnecté');
            reponse.redirect('/');
        }));
});

router.get("/liste", (requete, reponse) => {
    reponse.render("listeUsagers", {
    })});


router.post('/login', (req, rep, next)=>{
        passport.authenticate('local', {
            successRedirect: '/listeUsagers',
            failureRedirect: '/login',
            failureFlash: true
        })(req, rep, next);
});

module.exports = router;