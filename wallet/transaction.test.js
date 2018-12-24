const Transaction = require('./transaction');

const Wallet = require('./index');

describe('Transaction', () => {
    let transaction, wallet, recipient, amount;

    beforeEach( () => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';

        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('outputs `amount` substracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - amount);
    });

    it('validates a valid transaction', () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true);  
    });

    it('invalidates a corrupt transaction', () => {
        transaction.outputs[0].amount = 1000000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    });


    describe('updating a transaction', () => {
        let nextAmount, nextRecipient;

        beforeEach(() => {
            nextAmount = 20;
            nextRecipient = 'n3xt-4ddr355';
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        });

        it(`it subtracts the next amount from sender's output`, () => {
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount - nextAmount);
        });
    });



});