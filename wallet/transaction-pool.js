const Transaction = require('../wallet/transaction');

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

    existingTransaction(address){
        return this.transactions.find( t => t.input.address === address);
    }

    validTransactions(){
        return this.transactions.filter(transaction => {
            const outputTotal = transaction.outputs.reduce((total, output) => {
                return total + output.amout;
            }, 0);

            if(transaction.input.amout != outputTotal){
                console.log(`Invalid transaction from ${transaction.input.address}`);
                return;
            }

            if(!Transaction.verifyTransaction(transaction)){
                console.log(`invlaid transaction from ${transaction.input.address}`);
                return;
            }

            return transaction;
        });
    }
}

module.exports = TransactionPool;