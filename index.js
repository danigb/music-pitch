'use strict'

var pitch = require('pitch-parser')
var ap = require('./a-pitch')

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

/**
 * Get the pitch of a given frequency.
 *
 * It will round the frequency to the nearest pitch frequency. Use `cents` function
 * if you need to know the difference between the the frequency and the pitch.
 *
 * @param {Float} freq - the frequency
 * @return {String} the pitch
 *
 * @see cents
 *
 * @example
 * fromFreq(440) // => 'A4'
 * fromFreq(443) // => 'A4'
 * cents(443, 'A4') // => ... to get the difference
 */
function fromFreq (freq, tuning) {
  tuning = tuning || 440
  var lineal = 12 * ((Math.log(freq) - Math.log(tuning)) / Math.log(2))
  var midi = Math.round(69 + lineal)
  return fromMidi(midi)
}

// decimal number
var NUM = /^\d+(?:\.\d+)?$/
/**
 * Get the pitch frequency in hertzs
 *
 * @param {String} pitch - the pitch
 * @param {Integer} tuning - optional tuning, 440 by default
 * @return {Float} - the pitch frequency
 *
 * @example
 * toFreq('A4') // => 440
 * toFreq('A3', 444) // => 222
 */
function toFreq (p, tuning) {
  if (NUM.test(p)) return +p
  var midi = toMidi(pitch.parse(p) || p)
  if (!midi) return null
  tuning = tuning || 440
  return Math.pow(2, (midi - 69) / 12) * tuning
}

/**
 * Get the distance in cents between pitches or frequencies
 *
 * @param {String|Integer} from - first pitch or frequency
 * @param {String|Integer} to - other pitch or frequency
 * @param {Integer} decimals - the decimal precision (2 by default)
 * @return {Integer} the distance in cents
 *
 * @example
 * cents(440, 444) // => 15.66
 * cents('A4', 444) // => 15.66
 * cents('A4', 'A#4') // => 100
 */
function cents (from, to, decimals) {
  var dec = decimals ? Math.pow(10, decimals) : 100
  var fromFq = toFreq(from)
  var toFq = toFreq(to)
  return Math.floor(1200 * (Math.log(toFq / fromFq) * dec / Math.log(2))) / dec
}

var pitchToAny = ap.type(pitch.parse, null)

module.exports = {
  fromMidi: fromMidi,
  toMidi: pitchToAny(toMidi),
  fromFreq: fromFreq,
  toFreq: ap.type(pitch.parse, null, null)(toFreq),
  cents: cents
}
