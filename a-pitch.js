
var noop = function (x) { return x }

function type () {
  var argTypes = []
  var len = arguments.length - 1
  for (var i = 0; i < len; i++) {
    argTypes.push(arguments[i] || noop)
  }
  var returnType = arguments[len] || noop
  return function (fn) {
    return function () {
      var args = []
      for (var i = 0; i < len; i++) {
        args.push(argTypes[i](arguments[i]))
      }
      return returnType(fn.apply(null, args))
    }
  }
}

module.exports = {
  type: type
}
