class TransactionPool{
    constructor(){
        this.transactions=[];
    }

    updateTransanctions(transaction){
        let transactionId = this.transactions.find(t => t.id === transaction.id);

        if(transactionId){
            this.transactions[this.transactions.indexOf(transactionId)] = transaction;
        }else{
            this.transactions.push(transaction);
        }
    }
}

module.exports = TransactionPool;