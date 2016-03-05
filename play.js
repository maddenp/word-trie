/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

const fs = require('fs');
const lookup = require('./trie').lookup;
const prompt = () => process.stdout.write('> ');
const trie = JSON.parse(fs.readFileSync('trie.json', 'utf8'));

require('readline').createInterface({input: process.stdin}).on('line', word => {
  console.log(lookup(trie, word));
  prompt();
});

prompt();
