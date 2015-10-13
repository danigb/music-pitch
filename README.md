# music-pitch

Note names, midi, frequencies

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
<h4 class="name" id="chroma"><span class="type-signature"></span>chroma<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Get chroma of a pitch. The chroma is the integer notation of a pitch class</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L110">lineno 110</a>
</li>
</ul></dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>chroma('C') // => 0
chroma('B#') // => 0
chroma('Dbb') // => 0</code></pre>
</dd>
</dl>
<dl>
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
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L103">lineno 103</a>
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
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L62">lineno 62</a>
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
<pre class="prettyprint"><code>fromFreq(440) // => 'A4'
fromFreq(443) // => 'A4'
cents(443, 'A4') // => ... to get the difference</code></pre>
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
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L23">lineno 23</a>
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
<pre class="prettyprint"><code>fromMidi(69) // => 'A4'</code></pre>
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
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L82">lineno 82</a>
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
<pre class="prettyprint"><code>toFreq('A4') // => 440
toFreq('A3', 444) // => 222</code></pre>
</dd>
<dt>
<h4 class="name" id="toMidi"><span class="type-signature"></span>toMidi<span class="signature">(pitch, octave)</span><span class="type-signature"> &rarr; {Integer}</span></h4>
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
</td>
<td class="description last"><p>the pitch string</p></td>
</tr>
<tr>
<td class="name"><code>octave</code></td>
<td class="type">
<span class="param-type">Integer</span>
</td>
<td class="description last"><p>(Optional) the pitch octave (will override the
value from the pitch string)</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music-pitch/blob/master/index.js#L41">lineno 41</a>
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
<pre class="prettyprint"><code>toMidi('A4') // => 69
toMidi('A4', 3) // => 57</code></pre>
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
