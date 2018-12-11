class Block{
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString(){
        return ` Block - 
            timestamp: ${this.timestamp}
            lastHash: ${this.lastHash}
            hash: ${this.hash}
            data: ${this.data} `;
    }

    static genesis(){
        return new this('genesis', '-----', 'ajkd-ads1-fsdfl3-ljfkdsj1', []);
    }

    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = 'todo-hash';

        return new this(timestamp, lastHash, hash, data);

    }
}

module.exports = Block;