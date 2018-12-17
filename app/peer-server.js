const Websocket = require('ws');

const PEER_PORT = process.env.PEER_PORT || 5001;

const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class PeerServer {
    constructor(blockchain){
        this.blockchain = blockchain;
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
            this.blockchain.replaceChain(data);
        })
    }

    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChain(){
        this.sockets.forEach(socket => {
            this.sendChain(socket);
        });
    }
}

module.exports = PeerServer;

// Connect Peer eg: - HTTP_PORT=3003 PEER_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev