/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

const fs = require('fs');

const readfile = infile => {
  return JSON.parse(fs.readFileSync(infile, 'utf8'));
};

console.log(readfile('trie.json'));
