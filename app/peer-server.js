const Websocket = require('ws');

const PEER_PORT = process.env.PEER_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const MESSAGE_TYPES = {
    chain: 'CHAIN',
    transaction: 'TRANSACTION'
};

class PeerServer {
    constructor(blockchain, transactionPool){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.sockets = [];
    }


    listen(){
        const server = new Websocket.Server({port: PEER_PORT});
        server.on('connection', socket => this.connectSocket(socket));

        this.connectPeers();

        console.log(`Listening for peer to peer connections on: ${PEER_PORT}`); 
    }

    connectPeers(){
        peers.forEach( peer => {
            const socket = new Websocket(peer);

            socket.on('open', () => this.connectSocket(socket));
        });
    }


    connectSocket(socket){
        this.sockets.push(socket);
        console.log('Socket connected');
        this.messageHandler(socket);
        this.sendChain(socket);
    }

    messageHandler(socket){
        socket.on('message', message => {
            const data = JSON.parse(message);
            //console.log('data', data);
            switch(data.type){
                case MESSAGE_TYPES.chain:
                    this.blockchain.replaceChain(data.chain);
                    break;
                case MESSAGE_TYPES.transaction:
                    this.transactionPool.updateTransanctions(data.transaction);
                    break;
            }
            
        })
    }

    sendChain(socket){
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.chain,
            chain: this.blockchain.chain
        }));
    }

    sendTransaction(socket, transaction){
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.transaction,
            transaction
        }));
    }

    syncChain(){
        this.sockets.forEach(socket => {
            this.sendChain(socket);
        });
    }

    broadcastTransaction(transaction){
        this.sockets.forEach(socket => this.sendTransaction(socket, transaction));
    }
}

module.exports = PeerServer;

// Connect Peer eg: - HTTP_PORT=3003 PEER_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev