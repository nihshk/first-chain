const ChainUtil = require('../chain-util');
const {DIFFICULTY, MINE_RATE} = require('../config');

class Block{
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.difficulty = difficulty || DIFFICULTY;
        this.nonce = nonce;
    }

    toString(){
        return ` Block - 
            timestamp: ${this.timestamp}
            lastHash: ${this.lastHash}
            hash: ${this.hash}
            data: ${this.data} 
            difficulty: ${this.difficulty}
            nonce: ${this.nonce}`;
    }

    static genesis(){
        return new Block('genesis', '-----', 'ajkd-ads1-fsdfl3-ljfkdsj1', [], 0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data){
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let {difficulty} = lastBlock;
        let nonce = 0;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));   
        

        return new Block(timestamp, lastHash, hash, data, nonce, difficulty);

    }

    static hash(timestamp, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block){
        const{ timestamp, lastHash, data, nonce, difficulty} = block;

        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime){
        let {difficulty} = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty+1 : difficulty-1;
        return difficulty;
    }
}

module.exports = Block;