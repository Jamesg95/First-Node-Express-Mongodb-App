const express = require('express');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Favorite = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (res, req, next) => {
    Favorite.find()
    .populate('campsites')
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if (favorite) {
            req.body.forEach(favor => {
            if (!favorite.campsites.includes(favord._id)) {
                    favorite.campsites.push(favor._id);
                }
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }) 
        } else {
            Favorite.create({user: req.user._id, campsites: req.body})
            .then(favorite => {
                console.log('Favorite Created', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (res, req) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (res, req) => {
    Favorite.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response); 
    })
    .catch(err => next(err));
});


favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (res, req, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites');
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if (favorite) {
            if (favorite.campsites.includes(req.params.campsiteId)){
                console.log("That campsite is already in the list of favorites!");
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite)
            } else {
                favorite.campsites.push(req.params.campsiteId);
            }
            favorite.save()
            .then(favorite => {
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));    
        } else {
            Favorite.create({user: req.user._id, campsites:[req.params.campsite_id]})
            .then(favorite => {
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
            })
        .catch(err => next(err)); 
        }
    })
})

.put(cors.corsWithOptions, authenticate.verifyUser, (res, req) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if (favorite) {
            for (let i = (favorite.campsites.length -1); i>= 0; i--) {
                if (favorite.campsites[i]._id.equals(req.params.campsiteId)) {
                    favorite.campsites.splice(i,1)
                }
            }
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Favorite ${req.params.campsiteId} not found`);
            err.status = 400;
            return next (err);
        }  
    })
    .catch(err => next(err));
});


module.exports = favoriteRouter;