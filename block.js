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
            lastHash; ${this.lastHash}
            hash: ${this.hash}
            data: ${this.data} `;
    }
}

module.export = Block;