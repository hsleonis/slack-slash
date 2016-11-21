'use strict';
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

    var server = app.listen(3000, function() {
        console.log('Express server   listening on port %d in %s mode', server.address().port,   app.settings.env);
    });

    app.get('/', function(req, res){
        var data = {
            response_type: 'in_channel', // public to the channel
            text: 'Hello World!',
            attachments:[ {
                image_url: 'https://assets.api.ai/openapi-prod/300/assets/img/logo-black.png'
            } ]};

        res.json(data);
    });

    app.post('/', function(req, res){
        if(typeof req.body!=='undefined')
            var text = req.body.text;
        else
            var text = '';

        var url = 'http://jobs.bdjobs.com/jobsearch.asp';
        var propertiesObject = { txtsearch:text, qOT:'0', hidJobSearch:'jobsearch' };
        console.log('here');
        request({url:url, qs:propertiesObject}, function(error, response, html){

            if(!error){
                var html = cheerio.load(html);

                /*fs.writeFile('output.json', html, function(err){

                });*/

                var data = {
                    response_type: 'in_channel', // public to the channel
                    text: html,
                    attachments:[ {
                        image_url: 'https://assets.api.ai/openapi-prod/300/assets/img/logo-black.png'
                    } ]};

                res.json(data);
            }
            else console.log(error);
        });
    });