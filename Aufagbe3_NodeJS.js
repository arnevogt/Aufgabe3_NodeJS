var http = require('http');
var weather = require('openweathermap');
var url = require('url');


var port = 9080;
var appid = 'insert your api key'; //apikey

weather.defaults({units: 'metric', lang: 'de', mode: 'json'}); //default settings

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8'
    });

    var parsedUrl = url.parse(req.url, true); // true to get query as object
    var queryAsObject = parsedUrl.query;
    var cityParam = queryAsObject['city'];

    if (cityParam) {
        console.log('Abfrage fuer: ' + cityParam);

        weather.now({appid: appid, q: cityParam}, function (err, json) {
            //console.log(json);
            res.end(JSON.stringify(json));
        });
    } else {
        res.end(JSON.stringify({msg: "no parameter 'city' provided"}));
    }

}).listen(9080);

