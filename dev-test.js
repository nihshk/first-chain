const Block = require('./blockchain/block');

const block = Block.mineBlock(Block.genesis(), 'foo'); 

console.log(block.toString());
