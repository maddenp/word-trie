/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

module.exports.insert = (trie, word) => {
  word.split('').forEach(c => { trie = (trie[c] = trie[c] || {}); });
  trie['.'] = true;
};

module.exports.make = (infile, outfile) => {

  const fs = require('fs');
  const rl = require('readline');
  const reader = rl.createInterface({input: fs.createReadStream(infile)});
  const trie = {};

  reader.on('line', word => module.exports.insert(trie, word));
  reader.on('close', () => fs.writeFileSync(outfile, JSON.stringify(trie)));

};

module.exports.lookup = (trie, word) => (
  word.split('').every(c => trie = trie[c]) && trie['.'] !== undefined
);
