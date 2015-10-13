var vows = require('vows')
var assert = require('assert')
var arr = require('../a-pitch')

var noop = function (x) { return x }
var up = function (x) { return x.toUpperCase() }
var rev = function (x) { return x.substring(1) }
var num = function (x) { return /^\d+$/.test(x) ? +x : null }

vows.describe('fn').addBatch({
  'simple': function () {
    var fn = arr.fn([up], rev, noop)
    assert.equal(fn('ab'), 'B')
  },
  'exclude nulls': function () {
    var add = function (n) { return n + 10 }
    var fn = arr.fn([num], null, add)
    assert.equal(fn(10), 20)
    assert.equal(fn('a'), null)
  }
}).export(module)
