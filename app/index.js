const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const PeerServer = require('./peer-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;


const app = express();
const bc = new Blockchain();
const peerServer = new PeerServer(bc);

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);

});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added ${block.toString()}`);
    peerServer.syncChain();
    res.redirect('/blocks');
})

app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
})

peerServer.listen();