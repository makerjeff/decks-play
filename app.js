/**
 * Created by jefferson.wu on 6/7/16.
 */

var fs = require('fs');
var colors = require('colors');
var express = require ('express');
var bodyParser = require('body-parser');
//TODO add jade or another template engine

var port = process.argv[2];
var app = express();

// app data holder

var dataHolder = {
    app: 'Decks-play',
    version: '0.0.1',
    author: {
        name: 'Jefferson Wu',
        email: 'jefferson.wu@180la.com'
    }
};

// ======= MIDDLEWARE ========
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//enable CORS
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    next();
});

// = logger
// app.use(function(req, res, next){
//     console.log('%s, %s, %s, %s', req,method, req.url, req.path. colors.yellow(Date().toString()));
// });

//server static files
app.use(express.static(__dirname + "/public/"));

// ========= ROUTES =========

app.get('/debug', function(req, res){
    res.type('text/plain');
    res.send(grabPackageInfo().toString());
    //res.send('this is working');
});

// basic 404 catch-all route
app.get('*', function(request, response){
    response.sendFile(__dirname + '/public/404.html');
});

/* ===== START SERVER ===== */
initServer(port);


/* ===== FUNCTIONS ===== */

/**
 * Initialize the server.
 * @param port Port number to use. Defaults to 3000 if no port is specified.
 */
function initServer(port) {
    //if no port selected, default to 3000
    port = port || 3000;
    app.listen(port, function () {
        console.log(dataHolder.app + ' version ' + dataHolder.version + ' running on port ' + process.argv[2] + '.');
    });
}

function grabPackageInfo(){

    var dump = function() {
        fs.readFile('package.json', function(err, data){
            if(err) {
                console.log(Error(err));
            } else {
                console.log(data.toString());
                return data;
            }
        });

    }

    return dump();
}