'use strict';
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const request = require('request');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*const server = app.listen(3000,
        () => {
            console.log('Express server   listening on port %d in %s mode', server.address().port,   app.settings.env);
        });*/

        app.post('/', (req, res) => {
                if(typeof req.body!=='undefined')
                    let text = req.body.text;
                else
                    let text = '';

                var url = 'http://jobs.bdjobs.com/jobsearch.asp';
                var propertiesObject = { txtsearch:text, qOT:'0', hidJobSearch:'jobsearch' };

                request({url:url, qs:propertiesObject}, function(error, response, html){

                    if(!error){
                        var html = cheerio.load(html);

                        /*fs.writeFile('output.json', html, function(err){

                        });*/

                        let data = {
                            response_type: 'in_channel', // public to the channel
                            text: html,
                            attachments:[ {
                                image_url: 'https://assets.api.ai/openapi-prod/300/assets/img/logo-black.png'
                            } ]};

                        res.json(data);
                    }
                });
        });