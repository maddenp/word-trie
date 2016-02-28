/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

function trie_insert(trie, word) {
  word.split('').forEach(c => { trie = (trie[c] = trie[c] || {}); });
  trie['.'] = true;
}

function trie_lookup(trie, word) {
  word.split('').forEach(c => { if (!(trie = trie[c])) return false; });
  return trie['.'];
}

var fs = require('fs');
var readline = require('readline');
var filename = 'test';
var reader = readline.createInterface({input: fs.createReadStream(filename)});
var trie = {};

reader.on('line', function (word) {
  trie_insert(trie, word);
});

reader.on('close', function () {
  console.log(JSON.stringify(trie, null, 2));
  console.log('apple: ' + trie_lookup(trie, 'apple'));
  console.log('apples: ' + trie_lookup(trie, 'apples'));
  console.log('bana: ' + trie_lookup(trie, 'bana'));
});
