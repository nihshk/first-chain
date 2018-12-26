const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const PeerServer = require('./peer-server');
const Wallet = require('../wallet/index');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001;


const app = express();
const bc = new Blockchain();
const tp = new TransactionPool();
const wallet = new Wallet();
const peerServer = new PeerServer(bc, tp);

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);

});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added ${block.toString()}`);
    peerServer.syncChain();
    res.redirect('/blocks');
});

app.post('/transact', (req, res) => {
    const {recipient, amount} = req.body;
    const transaction = wallet.createTransaction(recipient, amount, tp);
    peerServer.broadcastTransaction(transaction);
    res.redirect('/transactions');
});

app.get('/transactions', (req, res) => {
    res.json(tp.transactions);
});

app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});

peerServer.listen();