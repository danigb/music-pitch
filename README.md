# music-pitch

[![Build Status](https://travis-ci.org/danigb/music-pitch.svg?branch=master)](https://travis-ci.org/danigb/music-pitch)
[![Code Climate](https://codeclimate.com/github/danigb/music-pitch/badges/gpa.svg)](https://codeclimate.com/github/danigb/music-pitch)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://badge.fury.io/js/music-pitch.svg)](https://badge.fury.io/js/music-pitch)


`music-pitch` is the bridge between midi, your app and your synthetizers. Is a small (2.5kb minified) and fast library to manipulate note names, midi notes and note frequencies.

```js
var pitch = require('music-pitch')
// get a note from midi
var note = pitch.fromMidi( ... )
// write it to the console
console.log(note)
// give it to your synth
synth.play(pitch.toFreq(note))
```

## Installation

#### For node

Install via npm: `npm install --save music-pitch` and require it.

#### Browsers

No distribution (yet). Use webpack, browserify or a similar tool.

## Usage

#### Note names

The `str` function returns the [scientific notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation) of a given note if valid. Can be used to check if its a valid note:

```js
pitch.str('bbb') // => 'Bbb'
pitch.str('fx4') // => 'F##4'

if (pitch.str(str) !== null) { /* valid pitch str */ }
```

You can get also pitch classes (pitches without octaves), note letter, octave and accidentals:

```js
pitch.pitchClass('c##5') // => 'C##'
pitch.letter('eb3') // => 'E'
pitch.octave('eb3') // => 3
pitch.accidentals('eb3') // => 'b'
```

#### Working with midi

You have two functions for converting from and to midi numbers:

```js
pitch.toMidi('A4') // => '69'
pitch.fromMidi(69) // => 'A4'
```

#### Working with frequencies

The same way, you have two frequency related functions:

```js
pitch.toFreq('A4') // => 440
pitch.fromFreq(440) // => 'A4'
```

#### Using different pitch notation

In the case scientific notation is not what you need, you can always use [pitch array notation](https://github.com/danigb/a-pitch) for every function that expects a string:

```js
pitch.toFreq([5, 0, 3]) // => 220
```

Also you can covert from scientific notation to pitch array notation with the pitch function:

```js
pitch('A3') // => [5, 0, 3]
```

#### More...

That's all for this library, but maybe you need [transpose notes](https://github.com/danigb/pitch-transpose)

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="accidentals"><span class="type-signature"></span>accidentals<span class="signature">(pitch)</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the accidentals from a pitch</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L101">lineno 101</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch accidentals</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.accidentals('C##3') // => '##'
pitch.accidentals('Bb4') // => 'b'
pitch.accidentals('E') // => ''</code></pre>
</dd>
<dt>
<h4 class="name" id="cents"><span class="type-signature"></span>cents<span class="signature">(from, to, decimals)</span><span class="type-signature"> &rarr; {Integer}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the distance in cents between pitches or frequencies</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>from</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Integer</span>
</td>
<td class="description last"><p>first pitch or frequency</p></td>
</tr>
<tr>
<td class="name"><code>to</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Integer</span>
</td>
<td class="description last"><p>other pitch or frequency</p></td>
</tr>
<tr>
<td class="name"><code>decimals</code></td>
<td class="type">
<span class="param-type">Integer</span>
</td>
<td class="description last"><p>the decimal precision (2 by default)</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L201">lineno 201</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the distance in cents</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Integer</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>cents(440, 444) // => 15.66
cents('A4', 444) // => 15.66
cents('A4', 'A#4') // => 100</code></pre>
</dd>
<dt>
<h4 class="name" id="fromFreq"><span class="type-signature"></span>fromFreq<span class="signature">(freq)</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the pitch of a given frequency.</p>
<p>It will round the frequency to the nearest pitch frequency. Use <code>cents</code> function
if you need to know the difference between the the frequency and the pitch.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>freq</code></td>
<td class="type">
<span class="param-type">Float</span>
</td>
<td class="description last"><p>the frequency</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L158">lineno 158</a>
</li>
</ul></dd>
<dt class="tag-see">See:</dt>
<dd class="tag-see">
<ul>
<li><a href="global.html#cents">cents</a></li>
</ul>
</dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.fromFreq(440) // => 'A4'
pitch.fromFreq(443) // => 'A4'
pitch.cents(443, 'A4') // => ... to get the difference</code></pre>
</dd>
<dt>
<h4 class="name" id="fromMidi"><span class="type-signature"></span>fromMidi<span class="signature">(midi)</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the pitch of the given midi number</p>
<p>This method doesn't take into account diatonic spelling. Always the same
pitch class is given to the same midi number.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>midi</code></td>
<td class="type">
<span class="param-type">Integer</span>
</td>
<td class="description last"><p>the midi number</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L119">lineno 119</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.fromMidi(69) // => 'A4'</code></pre>
</dd>
<dt>
<h4 class="name" id="letter"><span class="type-signature"></span>letter<span class="signature">(pitch)</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get letter of the pitch (in uppercase)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch as string or array</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L51">lineno 51</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the letter of the pitch in uppercase</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.letter('fx') // => 'F'</code></pre>
</dd>
<dt>
<h4 class="name" id="octave"><span class="type-signature"></span>octave<span class="signature">(pitch)</span><span class="type-signature"> &rarr; {Integer}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the octave of a pitch</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L66">lineno 66</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the octave number</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Integer</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.octave('F#3') // => 3</code></pre>
</dd>
<dt>
<h4 class="name" id="pitchClass"><span class="type-signature"></span>pitchClass<span class="signature">(pitch)</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the pitch class (pitch name without octaves) from a pitch</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch to get the pitchClass number from</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L82">lineno 82</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch class</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.pitchClass('a4') // => 'A'
pitch.pitchClass('ab') // => 'Ab'
pitch.pitchClass('cx2') // => 'C##'</code></pre>
</dd>
<dt>
<h4 class="name" id="str"><span class="type-signature"></span>str<span class="signature">(pitch)</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get pitch name in scientific notation</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch string or array</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L36">lineno 36</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the name of the pitch</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.str('cb') // => 'Cb'
pitch.str('fx2') // => 'F##2'</code></pre>
</dd>
<dt>
<h4 class="name" id="toFreq"><span class="type-signature"></span>toFreq<span class="signature">(pitch, tuning)</span><span class="type-signature"> &rarr; {Float}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the pitch frequency in hertzs</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>the pitch</p></td>
</tr>
<tr>
<td class="name"><code>tuning</code></td>
<td class="type">
<span class="param-type">Integer</span>
</td>
<td class="description last"><p>optional tuning, 440 by default</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L179">lineno 179</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<ul>
<li>the pitch frequency</li>
</ul>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Float</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.toFreq('A4') // => 440
pitch.toFreq('A3', 444) // => 222</code></pre>
</dd>
<dt>
<h4 class="name" id="toMidi"><span class="type-signature"></span>toMidi<span class="signature">(pitch)</span><span class="type-signature"> &rarr; {Integer}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the midi number of a pitch</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch string (or pitch array)</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L136">lineno 136</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the midi number</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Integer</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitch.toMidi('A4') // => 69
pitch.toMidi('A3') // => 57</code></pre>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT License
