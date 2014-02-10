var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    dogeAPI = require('./API'),
    dogecoin = require('node-dogecoin')({
      'user': 'dogecoinrpc',
      'pass': '2A18fXC4dY1EM24eXPDMY5C9WUPf6YDrWK5DZHVZEQaL'})

/*
 * Facilissima implementazione, user log in con dogecoin-id e password, fa deposito a noi.
 * Noi manteniamo in memoria l'ammontare del deposito e ovviamente chi ha depositato tale sommma.
 *
 * Poi diamo la possibilità di creare un piccolo widget, che permette di decidere la quantità di dogecoin da donare/traferire.
 * Dopo che l'utente clicca sul nostro widget facciamo la transazione.
 *
 * Chiaramente entrambi gli utenti devono essere sulla piattaforma.
 *
 * Un occhio alla sicurezza, non muovere più di 100 doge senza richiedere la password e l'ID per esempio.
 *
 * Ci teniamo 1 doge per transazione.
 *
 * Proporrei di implementare il tutto usando MongoDB come backend
 * Cosi diventa banale aggiungere anche lo storico delle transazioni effettuate e altre json ammenità varie
 *
 * */


var app = express();

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.post('/test', function (req, res) {
    res.send({status: "ok"});
});
app.get('/test', function (req, res) {
    res.send({status: route.prova(2, 3)});
});
app.post('/donation', function (req, res) {
    var donator = req.param('from');
    var receiver = req.param('to');
    var ammount = req.param('ammount');
    res.send("Donation from " + donator + " to " + receiver + " of " + ammount);
});
app.post('/new-user', function (req, res){
/*
 * Save the user psw and dogecoin wallet, psw must be hashed
 * */
});
app.post('/withdraw', function (req, res){
/*
 * Move doge from our wallet to the user wallet, change balance
 * */
});
app.post('/deposit', function (req, res){
/*
 * wait as soon as the deposit is confirmed and then change the balance
 * */
});
app.post('/balance', function (req, res){
/*
 * Return the balance associate with the wallet
 * */
});

/*
We use the public address as id, then we somebody makes a donation and we receive it we actually increas a counter linked to such account.
*/


app.listen(4242);
