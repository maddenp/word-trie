/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

const fs = require('fs');
const lookup = require('./trie').lookup;

const readfile = infile => {
  return JSON.parse(fs.readFileSync(infile, 'utf8'));
};

const prompt = () => process.stdout.write('> ');
const trie = readfile('trie.json');

require('readline').createInterface({input: process.stdin}).on('line', word => {
  console.log(lookup(trie, word));
  prompt();
});

prompt();
