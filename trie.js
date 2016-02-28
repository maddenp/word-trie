/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

function trie_insert(trie, word) {
  word.split('').forEach(c => { trie = (trie[c] = trie[c] || {}); });
  trie['.'] = true;
}

function trie_lookup(trie, word) {
  return word.split('').every(c => trie = trie[c]) && trie['.'] ? true : false;
}

var fs = require('fs');
var readline = require('readline');
var filename = 'test';
var reader = readline.createInterface({input: fs.createReadStream(filename)});
var trie = {};

reader.on('line', function (word) {
  trie_insert(trie, word);
});

var words = ['apple', 'banana', 'apples', 'bana'];

reader.on('close', function () {
  words.forEach(word => {
//     console.log('### checking ' + word);
//     console.log(JSON.stringify(trie, null, 2));
    console.log('### ' + word + ': ' + trie_lookup(trie, word));
  });
});
