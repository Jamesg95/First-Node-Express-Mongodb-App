const express = require('express');
const bodyParser = require('body-parser');

const partnerRouter = express.Router();

partnerRouter.use(bodyParser.json());

partnerRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the partners to you');
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.end('PUT operation not supported on /partners');
})
.delete((req, res) => {
    res.end('Deleting all partners');
});

partnerRouter.route('/:partnerId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end(`Will send this partner to you: partnerId: ${req.params.partnerId}`)
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.params.partnerId}`)
})
.put((req, res) => {
    res.statusCode = 403;
    res.write(`Updating with new partner with id of ${req.params.partnerId}`)
    res.end('')
})
.delete((req, res) => {
    res.end(`Deleting this partner: ${req.params.partnerId}`)
})


module.exports = partnerRouter;