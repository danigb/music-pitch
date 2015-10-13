
var identity = function (x) { return x }
var isArray = Array.isArray
var anything = { parse: identity, build: identity }

function type (parse, build) {
  if (arguments.length === 1) return type(parse.parse, parse.stringify)

  var cached = function (src) {
    if (typeof src === 'string') return parse(src)
    else if (isArray(src)) return build(src)
    else return null
  }
  cached.parse = function (value) {
    return isArray(value) ? value : cached(value)
  }
  cached.build = function (value) {
    return isArray(value) ? cached(value) : null
  }
  return cached
}

function fn (parsers, builder, fn) {
  var len = parsers.length
  builder = builder || identity

  return function () {
    var value
    var args = []
    for (var i = 0; i < len; i++) {
      value = parse(parsers[i], arguments[i])
      if (value === null) return
      args.push(value)
    }
    return builder(fn.apply(null, args))
  }
}

function parse (parser, value) {
  if (!(typeof value === 'string')) return value
  return (parser || identity)(value)
}

module.exports = {
  type: type,
  fn: fn,
  anything: anything
}
