
# find-same-parts
[![build status](https://travis-ci.org/chenjihu/findSameParts.svg?branch=master)](https://github.com/chenjihu/findSameParts?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/chenjihu/findSameParts/badge.svg?branch=master)](https://coveralls.io/github/chenjihu/findSameParts?branch=master)

Find the same parts from two given strings


## Install

```bash
$ npm install find-same-parts --save
```

## Usage

```javascript
findSameParts(firstString, secondString, options);
// will return the sames part in array
// options
// * minStrLength {INT}, set the minimum length of same parts
// * ignoreCase {Boolean}
```

e.g.
```javascript
var findSameParts = require('find-same-parts');

findSameParts('hello world', 'Hello world'); //  ['hello world']
findSameParts('hello world', 'Hello world', {ignoreCase: false});  //  ['ello world']

findSameParts('hello world, bot', 'hello somebody, bot'); // ['hello', 'bot']
findSameParts('hello world, bot', 'hello somebody, bot', {minStrLength: 4}); ['hello']
```
