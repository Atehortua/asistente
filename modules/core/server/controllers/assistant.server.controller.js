'use strict';

var mongoose = require('mongoose'),
    AssistantDb = mongoose.model('AssistantDb'),
    _ = require('lodash');



exports.findLinks = function(req,res){
    AssistantDb.find().exec(function(err, links) {
        if (err) {
            return res.render('error', {
                status: 500
            });
        } else {
            return res.jsonp(links);
        }
    });
};

exports.add = function(req,res){
    var link = new AssistantDb(req.body)
    var status = {};
    link.save(function(err) {
        status = {link: link, status: true}
        if (err) {
            console.log("Problemas :( ", err)
            status.status = false;
            return res.jsonp(status)
        } else {
            console.log("Se guardo exitosamente la grafica", link);
            return res.jsonp(status)
        }
    });
};
