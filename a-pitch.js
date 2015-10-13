
var noop = function (x) { return x }

function type () {
  var argParsers = []
  var len = arguments.length - 1
  for (var i = 0; i < len; i++) {
    argParsers.push(arguments[i] || noop)
  }
  var builder = arguments[len] || noop
  return function (fn) {
    return function () {
      var value
      var args = []
      for (var i = 0; i < len; i++) {
        value = argParsers[i](arguments[i])
        if (value === null) return null
        else args.push(value)
      }
      return builder(fn.apply(null, args))
    }
  }
}

module.exports = {
  type: type
}
