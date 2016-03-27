/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

const fs = require('fs');
const lookup = require('./trie').lookup;
const zlib = require('zlib');

const responses = {
  match: 'Match!',
  nomatch: 'Not a match...',
  noword: 'Not a word!'
};

const random_number = (lo, hi) => (
  Math.floor(Math.random() * (hi - lo) + lo)
);

const random_string = () => (
  [1, 2, 3].reduce(s => s + String.fromCharCode(random_number(65, 91)), '')
);

const query = rndstr => {
  console.log('match: ' + rndstr);
  process.stdout.write('> ')
};

const word_check = (trie, rndstr, word) => {
  if (lookup(trie, word.toLowerCase())) {
    const letters = word.split('');
    const caps = letters.reduce((s, c) => s + (c === c.toUpperCase() ? c : ''), '');
    if (caps === rndstr) return 'match';
    return 'nomatch';
  }
  return 'noword';
};

require('readline').createInterface({input: process.stdin}).on('line', word => {
  switch (word) {
  case '.b':
    console.log('[bet]');
    break;
  case '.l':
    console.log('[lock]');
    break;
  case '.n':
    console.log('[next]');
    rndstr = random_string();
    break;
  default:
    var word_status = word_check(trie, rndstr, word);
    console.log(responses[word_status]);
    break;
  }
  query(rndstr);
});

const compressed = new Buffer(fs.readFileSync('trie.gz', 'ascii'), 'base64')
const trie = JSON.parse(zlib.gunzipSync(compressed).toString());

var rndstr = undefined;

query(rndstr = random_string());
