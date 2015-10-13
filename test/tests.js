var vows = require('vows')
var assert = require('assert')
var pitch = require('../')

vows.describe('music-pitch').addBatch({
  'pitch str': {
    'name': function () {
      assert.equal(pitch.name('c'), 'C')
      assert.equal(pitch.name('bbb3'), 'Bbb3')
      assert.equal(pitch.name('fx'), 'F##')
      assert.equal(pitch.name([0, 1, 3]), 'C#3')
    },
    'letter': function () {
      assert.equal(pitch.letter('fx'), 'F')
      assert.equal(pitch.letter('blah'), null)
    },
    'octave': function () {
      assert.equal(pitch.octave('C##4'), 4)
      assert.equal(pitch.octave([3, -2, 2]), 2)
      assert.equal(pitch.octave('C##'), null)
    },
    'pitch class': function () {
      assert.equal(pitch.pitchClass('e#2'), 'E#')
      assert.equal(pitch.pitchClass('dxx'), 'D####')
      assert.equal(pitch.pitchClass('db'), 'Db')
    }
  },
  'midi': {
    'fromMidi': function () {
      var notes = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73]
      .map(pitch.fromMidi).join(' ')
      assert.equal(notes, 'C4 Db4 D4 Eb4 E4 F4 F#4 G4 Ab4 A4 Bb4 B4 C5 Db5')
    },
    'toMidi': function () {
      assert.deepEqual('C4 D4 E4 F4 G4 A4 B4 C4'.split(' ').map(pitch.toMidi), [60, 62, 64, 65, 67, 69, 71, 60])
      assert.deepEqual('C#4 D#4 E#4 F#4 G#4 A#4 B#4 C#4'.split(' ').map(pitch.toMidi), [61, 63, 65, 66, 68, 70, 72, 61])
      assert.deepEqual('C##4 D##4 E##4 F##4 G##4 A##4 B##4 C##4'.split(' ').map(pitch.toMidi), [62, 64, 66, 67, 69, 71, 73, 62])
      assert.deepEqual('Cb4 Db4 Eb4 Fb4 Gb4 Ab4 Bb4 Cb4'.split(' ').map(pitch.toMidi), [59, 61, 63, 64, 66, 68, 70, 59])
      assert.deepEqual('Cbb3 Dbb3 Ebb3 Fbb3 Gbb3 Abb3 Bbb3 Cbb3'.split(' ').map(pitch.toMidi), [46, 48, 50, 51, 53, 55, 57, 46])
    },
    'toMidi: pitch class does not have midi': function () {
      assert.deepEqual('C D E F G A B C'.split(' ').map(pitch.toMidi), [ null, null, null, null, null, null, null, null ])
    },
    'toMidi: enharmonics': function () {
      assert.equal(pitch.toMidi('B#3'), pitch.toMidi('C4'))
      assert.equal(pitch.toMidi('B##3'), pitch.toMidi('Db4'))
    }
  },
  'frequencies': {
    'fromFreq': function () {
      assert.equal(pitch.fromFreq(440), 'A4')
      assert.equal(pitch.fromFreq(220), 'A3')
      assert.equal(pitch.fromFreq(329.6275569128699), 'E4')
      assert.equal(pitch.fromFreq(330), 'E4')
      assert.equal(pitch.fromFreq(335), 'E4')
      assert.equal(pitch.fromFreq(340), 'F4')
      assert.equal(pitch.fromFreq(349.2282314330039), 'F4')
    },
    'fromFreq with custom tuning': function () {
      assert.equal(pitch.fromFreq(220, 220), 'A4')
    },
    'toFreq': function () {
      assert.equal(pitch.toFreq('A4'), 440)
      assert.equal(pitch.toFreq('A3'), 220)
      assert.equal(pitch.toFreq('E4'), 329.6275569128699)
      assert.equal(pitch.toFreq('F4'), 349.2282314330039)
    },
    'toFreq custom tuning': function () {
      assert.equal(pitch.toFreq('A4', 444), 444)
      assert.equal(pitch.toFreq('A3', 444), 222)
    },
    'cents': function () {
      assert.equal(pitch.cents('A4', 'A#4'), 100)
      assert.equal(pitch.cents('A4', 444), 15.66)
    }
  },
  'chroma': {
    'pitch chroma chroma': function () {
      assert.deepEqual('C C# D D# E F F# G G# A A# B B#'.split(' ').map(pitch.chroma),
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0])
      assert.deepEqual('Cb C Db D Eb E F Gb G Ab A Bb B'.split(' ').map(pitch.chroma),
      [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    },
    'edge cases': function () {
      assert.equal(pitch.chroma('Bb'), 10)
      assert.equal(pitch.chroma('Bbb'), 9)
      assert.equal(pitch.chroma('bbb'), 9)
      assert.equal(pitch.chroma('B#'), 0)
      assert.equal(pitch.chroma('B##'), 1)
    },
    'invalid pitch chromas': function () {
      assert.equal(pitch.chroma('blah'), null)
      assert.equal(pitch.chroma('m'), null)
      assert.equal(pitch.chroma('Cmaj7'), null)
    }
  }
}).export(module)
