'use strict'

var asPitch = require('pitch-parser')

function asArray (pitch) {
  return Array.isArray(pitch) ? pitch : asPitch.parse(pitch)
}

function parseDecorator (fn) {
  return function (pitch) {
    var p = asArray(pitch)
    return p ? fn(p) : null
  }
}

// Semitones from C to C D E F G A B
var SEMITONES = [ 0, 2, 4, 5, 7, 9, 11 ]
// Chromatic melodic scale
var CHROMATIC = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B' ]

var lib = asArray
module.exports = lib

/**
 * Get pitch name in scientific notation
 *
 * @param {String|Array} pitch - the pitch string or array
 * @return {String} the name of the pitch
 */
function str (pitch) {
  var p = Array.isArray(pitch) ? pitch : asPitch.parse(pitch)
  return p ? asPitch.stringify(p) : null
}
lib.str = str

/**
 * Get letter of the pitch (in uppercase)
 *
 * @param {String|Array} pitch - the pitch as string or array
 * @return {String} the letter of the pitch in uppercase
 *
 * @example
 * pitch.letter('fx') // => 'F'
 */
function letter (pitch) {
  var n = str(pitch)
  return n ? n.slice(0, 1) : null
}
lib.letter = letter

/**
 * Get the octave of a pitch
 *
 */
function octave (pitch) {
  return pitch[2]
}
lib.octave = parseDecorator(octave)

/**
 * Get the pitch class (pitch name without octaves) from a pitch
 *
 * @param {String} pitch - the pitch to get the pitchClass number from
 * @return {String} the pitch class
 *
 * @example
 * pitchClass('a4') // => 'A'
 * pitchClass('ab') // => 'Ab'
 * pitchClass('cx2') // => 'C##'
 */
function pitchClass (p) {
  if (!p) return null
  else if (Array.isArray(p)) return [p[0], p[1], null]
  p = asPitch.parse(p)
  return p ? asPitch.stringify(pitchClass(p)) : null
}
lib.pitchClass = pitchClass

/**
 * Get the accidentals from a pitch
 *
 * @param {String|Array} pitch - the pitch
 * @return {String} the pitch accidentals
 *
 * @example
 * pitch.accidentals('C##3') // => '##'
 * pitch.accidentals('Bb4') // => 'b'
 * pitch.accidentals('E') // => ''
 */
function accidentals (p) {
  var pc = pitchClass(p)
  return pc ? pc.substring(1) : null
}
lib.accidentals = accidentals

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
lib.fromMidi = fromMidi

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
function toMidi (p) {
  if (!p[2] && p[2] !== 0) return null
  return SEMITONES[p[0]] + p[1] + 12 * (p[2] + 1)
}
lib.toMidi = parseDecorator(toMidi)

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
lib.fromFreq = fromFreq

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
  var midi = toMidi(asPitch.parse(p))
  if (!midi) return null
  tuning = tuning || 440
  return Math.pow(2, (midi - 69) / 12) * tuning
}
lib.toFreq = toFreq

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
lib.cents = cents
