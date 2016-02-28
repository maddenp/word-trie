/* jshint node: true */

"use strict";

function str_trie_insert(trie, word) {
  var letters = word.split('');
  for (var i = 0; i < letters.length; i++) {
    var letter = letters[i];
    trie = (trie[letter] = trie[letter] || {letter: undefined});
  }
  trie['.'] = true;
}

function str_trie_lookup(trie, word) {
  var letters = word.split('');
  for (var i = 0; i < letters.length; i++) {
    var letter = letters[i];
    trie = trie[letter];
    if (trie === undefined) return false;
  }
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
});
