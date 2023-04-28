const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const passport = require ("passport");
const flash = require("connect-flash");
const session = require("express-session");
const upload = multer({dest: './uploads/'});

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname);
    }
});
app.use(upload.any());

//Message error ou succès pour BD 
const db = mongoose.connection;
db.on("error", err => console.error("erreur de BD"));
db.on("open", ()=>console.log("Connexion à la BD ok!!"));

// insérer les configs de passport ici...
//require('./config/passport')(passport);

// récupérer les variables reçues de "POST" (dans la requete.body)
app.use(express.urlencoded({extended: false}));

// création de la session express
app.use(session({
    secret: 'trucMachinBiduleSecretABC..XYZSupplementaireavec beaucoup de lettres',
    resave: true,
    saveUninitialized: true
}));

// initialisation de passport et le relier à la session
app.use(passport.initialize());
app.use(passport.session());

// connexion à flash
app.use(flash());

// quelques variables à définir pour le fonctionnement de l'authentification
app.use(function(req, rep, next){
    rep.locals.success_msg = req.flash('success_msg');
    rep.locals.error_msg = req.flash('error_msg');
    rep.locals.error = req.flash('error'); 
    next();
});

app.use('/uploads', express.static('./statique/images'));


// les routes
app.use('/usagers', require('./routes/usagers'));

// mes VUES
app.set('views', './views');
app.set('view engine', 'ejs');


//connection à la BD
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://franc590:Patate01@cluster0.4gnugsd.mongodb.net/test")

app.listen(PORT, console.log(`Serveur démarré sur le port ${PORT}`));