/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

const fs = require('fs');
const lookup = require('./trie').lookup;
const prompt = () => process.stdout.write('> ');
const zlib = require('zlib');

var compressed = new Buffer(fs.readFileSync('trie.gz', 'utf8'), 'base64')
var trie = JSON.parse(zlib.gunzipSync(compressed).toString());

require('readline').createInterface({input: process.stdin}).on('line', word => {
  console.log(lookup(trie, word));
  prompt();
});

prompt();
