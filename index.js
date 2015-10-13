'use strict'

var pitch = require('pitch-parser')
var type = require('./type')

var CHROMATIC = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B' ]

/**
 * Get the pitch of the given midi number
 *
 * This method doesn't take into account diatonic spelling. Always the same
 * pitch class is given to the same midi number.
 *
 * @param {Integer} midi - the midi number
 * @return {String} the pitch
 *
 * @example
 * fromMidi(69) // => 'A4'
 */
function fromMidi (midi) {
  var name = CHROMATIC[midi % 12]
  var oct = Math.floor(midi / 12) - 1
  return name + oct
}

// Semitones for C D E F G A B
var SEMITONES = [ 0, 2, 4, 5, 7, 9, 11 ]

/**
 * Get the midi number of a pitch
 *
 * @param {String} pitch - the pitch string
 * @param {Integer} octave - (Optional) the pitch octave (will override the
 * value from the pitch string)
 * @return {Integer} the midi number
 *
 * @example
 * toMidi('A4') // => 69
 * toMidi('A4', 3) // => 57
 */
function toMidi (t) {
  if (!t[2] && t[2] !== 0) return null
  return SEMITONES[t[0]] + t[1] + 12 * (t[2] + 1)
}

module.exports = {
  fromMidi: fromMidi,
  toMidi: type(pitch.parse, null)(toMidi)
}
