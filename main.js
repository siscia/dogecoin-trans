var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    dogecoin = require('node-dogecoin')({
      'user': 'dogecoinrpc',
      'pass': '2A18fXC4dY1EM24eXPDMY5C9WUPf6YDrWK5DZHVZEQaL'})

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
    res.send({status: "ok"});
});
app.post('/donation', function (req, res) {
    var donator = req.param('from');
    var receiver = req.param('to');
    var ammount = req.param('ammount');
    res.send("Donation from " + donator + " to " + receiver + " of " + ammount);
});
app.post('/check', function (req, res) {
    res.send("called check account.")
});

/*
We use the public address as id, then we somebody makes a donation and we receive it we actually increas a counter linked to such account.
*/


app.listen(4242);
