const express = require('express');
const database = require('./config/database')
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./config/swagger.json');
    const cookieParser = require('cookie-parser');

const port = 5000
const app = express();
const cors = require('cors')
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// parse application/json
app.use(express.json())
app.use(cookieParser())    //<----- This middleware is needed to read Cookie from request. Without it, we'll get no req.cookie...
app.use(express.json())    //<----- this middleware is needed to read JSON from request. Without it, we'll get req.body == undefined.

const adminRouter = require('./routers/adminRouter');
const categorieRouter = require('./routers/categorieRouter');
const commentaireRouter = require('./routers/commentaireRouter');
const condidatRouter = require('./routers/condidatRouter');
const condidatureRouter = require('./routers/condidatureRouter');
const entrepriseRouter = require('./routers/entrepriseRouter');
const offreEmploiRouter = require('./routers/offreEmploiRouter');
const testRouter = require('./routers/testRouter');
const usersrouter = require('./routers/usersRouter');

app.use('/admin', adminRouter);
app.use('/users', usersrouter);
app.use('/condidat', condidatRouter);
app.use('/entreprise', entrepriseRouter);
app.use('/condidature', condidatureRouter);
app.use('/test', testRouter);
app.use('/commentaire', commentaireRouter);
app.use('/offreEmploi', offreEmploiRouter);
app.use('/categorie', categorieRouter);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error

app.get("/getfile/:image", function (req, res) {
    res.sendFile(__dirname + "/uploads/" + req.params.image);
});


app.use(function (req, res, next) {
    let err = new Error();
    err.status = 404;
    next(err);
});
// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: " Path Not found" });
    else
        res.status(500).json({ message: "Something looks wrong " });
});



app.listen(port, console.log(`server running at http//localhost:${port}`));