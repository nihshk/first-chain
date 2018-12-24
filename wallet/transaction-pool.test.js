const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');


describe('TransactionPool', () => {
    let tp, wallet, transaction;

    beforeEach(() => {
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet, 'r4nd-4ddr355', 30);
        tp.updateTransanctions(transaction);
    });

    it('adds transaction to the pool', () => {
        expect(tp.transactions.find( t => t.id === transaction.id)).toEqual(transaction);
    });

    it('updates the transaction in pool', () => {
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);
        tp.updateTransanctions(newTransaction);

        expect(JSON.stringify(tp.transactions.find( t => t.id === newTransaction.id))).not.toEqual(oldTransaction);

    });
});