var vows = require('vows')
var assert = require('assert')
var type = require('../type')

var noop = function (x) { return x }
var up = function (x) { return x.toUpperCase() }
var rev = function (x) { return x.substring(1) }

vows.describe('type').addBatch({
  'simple': function () {
    var fn = type(up, rev)(noop)
    assert.equal(fn('ab'), 'B')
  }
}).export(module)
