class Miner {
    constructor(blockchain, transactionPool, wallet, peerServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.peerServer = peerServer;
    }


    mine(){
        const validTransactions = this. transactionPool.validTransactions();
    }
}