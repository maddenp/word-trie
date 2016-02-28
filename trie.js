/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

function str_trie_insert(trie, word) {
  var letters = word.split('');
  for (var i = 0; i < letters.length; i++) {
    var c = letters[i];
    trie = (trie[c] = trie[c] || {});
  }
  trie['.'] = true;
}

function str_trie_lookup(trie, word) {
  word.split('').forEach(c => { if (!(trie = trie[c])) return false; });
  return trie['.'] ? true : false;
}

var fs = require('fs');
var readline = require('readline');
var filename = 'test';
var reader = readline.createInterface({input: fs.createReadStream(filename)});
var trie = {};

reader.on('line', function (word) {
  str_trie_insert(trie, word);
});

reader.on('close', function () {
  console.log(JSON.stringify(trie, null, 2));
  console.log('apple: ' + str_trie_lookup(trie, 'apple'));
  console.log('apples: ' + str_trie_lookup(trie, 'apples'));
  console.log('bana: ' + str_trie_lookup(trie, 'bana'));
});
