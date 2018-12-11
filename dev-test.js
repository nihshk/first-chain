const Block = require('./block');

const block = Block.mineBlock(Block.genesis(), 'foo'); 

console.log(block.toString());
