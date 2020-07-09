const express = require('express');
const bodyParser = require('body-parser');

const campsiteRouter = express.Router();

campsiteRouter.use(bodyParser.json());

campsiteRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});

campsiteRouter.route('/:campsiteId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end(`Will send this campsite to you: campsiteId: ${req.params.campsiteId}`)
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.params.campsiteId}`)
})
.put((req, res) => {
    res.statusCode = 403;
    res.write(`Updating with new campsite with id of ${req.params.campsiteId}`)
    res.end('')
})
.delete((req, res) => {
    res.end(`Deleting this campsite: ${req.params.campsiteId}`)
})

module.exports = campsiteRouter;