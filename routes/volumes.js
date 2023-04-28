const express = require("express");
const router = express.Router();
const Usagers = require('../modeles/volumes');
const mongoose = require('mongoose');

router.get("/ajouter", (requete, reponse) => {
    reponse.render("volumes", {
    })});

router.post('/ajouter', estAdmin, (requete, reponse) => {
        const {_id, titreVol, nomImg} = requete.body;
        const {originalname, destination, filename, size, path, mimetype} = requete.files[0];
        const maxFileSize = 500*10;
        const mimetypePermis = ['image/png', 'image/jpg'];
        let errors = [];
        if (size > maxFileSize) {
            errors.push( {msg: `La taille du fichier est trop grande (max ${maxFileSize} octets)`} );
        } else {
            if (!mimetypePermis.includes(mimetype)) {
                errors.push( {msg: 'Format de fichier non accepté'} );
            }
        }
        if (!_id || !titreVol || !nomImg) {
            errors.push({msg: 'Remplir toutes les cases du formulaire'});
        } else {
            Usagers.findOne({login: login})
            .then(user=>{
                if (user) {
                    supprimerFichier(path);
                    errors.push({msg: 'Ce volume existe déja'});
                    reponse.render('volume', {
                        errors,
                        titre: 'Ajout d\'un volume',
                        titreVol,
                        nomImg
                    });
                } else {
                    const newUser = new Usagers({
                        _id: new mongoose.Types.ObjectId(),
                        titre, 
                        nomImage,
                    });
                    console.log('voici l\'usager a mettre en BD', newUser);
                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(newUser.pwd, salt, (err, hash)=>{
                            if (err) throw err;
                            newUser.fichierImage = conserverFichier(path, filename);
                            newUser.save()
                            .then(user=>{
                                requete.flash('success_msg', 'volume inscrit à la BD!');
                                reponse.redirect('/liste');
                            })
                            .catch(err=>console.log(err));
                        });
                    });
                }
            })
        }
    });

router.get("/liste", (requete, reponse) => {
        reponse.render("listeVolumes", {
        })});

module.exports = router;
