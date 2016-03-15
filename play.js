/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

const random_number = (lo, hi) => (
  Math.floor(Math.random() * (hi - lo) + lo)
);

const random_string = () => (
  [1, 2, 3].reduce(s => s + String.fromCharCode(random_number(65, 91)), '')
);

const fs = require('fs');
const lookup = require('./trie').lookup;
const prompt = () => process.stdout.write('> ');
const rs = random_string();
const zlib = require('zlib');

var compressed = new Buffer(fs.readFileSync('trie.gz', 'ascii'), 'base64')
var trie = JSON.parse(zlib.gunzipSync(compressed).toString());

require('readline').createInterface({input: process.stdin}).on('line', word => {
  var msg = '> not a word';
  if (lookup(trie, word.toLowerCase())) {
    var letters = word.split('');
    var caps = letters.reduce((s, c) => s + (c === c.toUpperCase() ? c : ''), '');
    if (caps === rs) {
      msg = '> MATCH!';
    } else {
      msg = '> not a match';
    }
  }
  console.log(msg);
  prompt();
});

console.log('> ' + rs);

prompt();
