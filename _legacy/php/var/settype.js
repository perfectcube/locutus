module.exports = function settype (vr, type) {
  //  discuss at: https://locutus.io/php/settype/
  // original by: Waldo Malqui Silva (https://waldo.malqui.info)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //        note: Credits to Crockford also
  //        note: only works on global variables, and "vr" must be passed in as a string
  //   example 1: var $foo = '5bar'
  //   example 1: settype('$foo', 'integer')
  //   example 1: $result = $foo
  //   returns 1: 5
  //   example 2: var $foo = true
  //   example 2: settype('$foo', 'string')
  //   example 2: $result = $foo
  //   returns 2: '1'

  var isArray = function (arr) {
    return typeof arr === 'object' && typeof arr.length === 'number' && !(arr.propertyIsEnumerable('length')) &&
      typeof arr.splice === 'function'
  }
  var v, mtch, i, obj
  v = this[vr] ? this[vr] : vr

  try {
    switch (type) {
      case 'boolean':
        if (isArray(v) && v.length === 0) {
          this[vr] = false
        } else if (v === '0') {
          this[vr] = false
        } else if (typeof v === 'object' && !isArray(v)) {
          var _, lgth = false
          for (_ in v) {
            lgth = true
            break;
          }
          this[vr] = lgth
        } else {
          this[vr] = !!v
        }
        break
      case 'integer':
        if (typeof v === 'number') {
          this[vr] = parseInt(v, 10)
        } else if (typeof v === 'string') {
          mtch = v.match(/^([+\-]?)(\d+)/)
          if (!mtch) {
            this[vr] = 0
          } else {
            this[vr] = parseInt(v, 10)
          }
        } else if (v === true) {
          this[vr] = 1
        } else if (v === false || v === null) {
          this[vr] = 0
        } else if (isArray(v) && v.length === 0) {
          this[vr] = 0
        } else if (typeof v === 'object') {
          this[vr] = 1
        }

        break
      case 'float':
        if (typeof v === 'string') {
          mtch = v.match(/^([+\-]?)(\d+(\.\d+)?|\.\d+)([eE][+\-]?\d+)?/)
          if (!mtch) {
            this[vr] = 0
          } else {
            this[vr] = parseFloat(v)
          }
        } else if (v === true) {
          this[vr] = 1
        } else if (v === false || v === null) {
          this[vr] = 0
        } else if (isArray(v) && v.length === 0) {
          this[vr] = 0
        } else if (typeof v === 'object') {
          this[vr] = 1
        }
        break
      case 'string':
        if (v === null || v === false) {
          this[vr] = ''
        } else if (isArray(v)) {
          this[vr] = 'Array'
        } else if (typeof v === 'object') {
          this[vr] = 'Object'
        } else if (v === true) {
          this[vr] = '1'
        } else {
          this[vr] += ''
        } // numbers (and functions?)
        break
      case 'array':
        if (v === null) {
          this[vr] = []
        } else if (typeof v !== 'object') {
          this[vr] = [v]
        }
        break
      case 'object':
        if (v === null) {
          this[vr] = {}
        } else if (isArray(v)) {
          for (i = 0, obj = {}; i < v.length; i++) {
            obj[i] = v
          }
          this[vr] = obj
        } else if (typeof v !== 'object') {
          this[vr] = {
            scalar: v
          }
        }
        break
      case 'null':
        delete this[vr]
        break
    }
    return true
  } catch (e) {
    return false
  }
}
