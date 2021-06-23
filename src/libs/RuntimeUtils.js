'use strict'

module.exports = {
  isClass: function isClass (func) {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func))
  }
}
