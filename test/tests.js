var vows = require('vows')
var assert = require('assert')
var pitch = require('../')

vows.describe('music-pitch').addBatch({
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
  }
}).export(module)
