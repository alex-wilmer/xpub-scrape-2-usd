'use strict';

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var xpub = 'xpub6BexSzHWoWSfWXXu7EpU4mnSVaN8JPPGLRsSD2GbK69hs5pXDqra' + 'ghhM7Lc64DArtf9ZUh4TkMwDFieXVk1MdrXCUYS7v7P3VXqNZ81NAkr';

var btcAvgUrl = 'https://api.bitcoinaverage.com/ticker/global/USD/';

app.get('/getPrice', function (req, res) {
  var url = 'https://blockchain.info/xpub/' + xpub;

  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      $('#final_balance span').filter(function () {
        var satoshis = +this.attribs['data-c'];
        var bitcoins = satoshis / 10e7;
        request(btcAvgUrl, function (error, response, html) {
          var last = JSON.parse(response.body).last;
          res.send('<h2>BTC -> USD = $' + last + '</h2>\n            <h3>Wallet: ' + xpub + '</h3>\n            <h4>USD: $' + (last * bitcoins).toFixed(2) + '</h4>\n            <h5>Satoshis: ' + satoshis + '</h5>');
        });
      });
    }
  });
});

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;