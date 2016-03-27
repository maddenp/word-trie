/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

module.exports.insert = (trie, word) => {
  word.split('').forEach(c => { trie = (trie[c] = trie[c] || {}); });
  trie['.'] = true;
};

module.exports.make = (infile, outfile) => {

  const fs = require('fs');
  const reader = require('readline').createInterface({input: fs.createReadStream(infile)});
  const trie = {};
  const zlib = require('zlib');

  reader.on('line', word => module.exports.insert(trie, word));

  reader.on('close', () => (
    fs.writeFileSync(outfile, zlib.gzipSync(JSON.stringify(trie), {level: 9}).toString('base64'), 'ascii')
  ));

};

module.exports.lookup = (trie, word) => (
  word.split('').every(c => trie = trie[c]) && trie['.'] !== undefined
);
