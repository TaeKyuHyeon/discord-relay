'use strict';

console.log('Server init start');
const Server = require("./server");
// todo : config
module.exports = new Server('localhost', 3000);
