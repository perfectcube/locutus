module.exports = function sort (inputArr, sort_flags) {
  //  discuss at: http://locutusjs.io/php/sort/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: SORT_STRING (as well as natsort and natcasesort) might also be
  //        note: integrated into all of these functions by adapting the code at
  //        note: http://sourcefrog.net/projects/natsort/natcompare.js
  //        note: This function deviates from PHP in returning a copy of the array instead
  //        note: of acting by reference and returning true; this was necessary because
  //        note: IE does not allow deleting and re-adding of properties without caching
  //        note: of property position; you can set the ini of "locutus.strictForIn" to true to
  //        note: get the PHP behavior, but use this only if you are in an environment
  //        note: such as Firefox extensions where for-in iteration order is fixed and true
  //        note: property deletion is supported. Note that we intend to implement the PHP
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since
  //        note: is by reference in PHP anyways
  //        note: Since JS objects' keys are always strings, and (the
  //        note: default) SORT_REGULAR flag distinguishes by key type,
  //        note: if the content is a numeric string, we treat the
  //        note: "original type" as numeric.
  //   example 1: var arr = ['Kevin', 'van', 'Zonneveld']
  //   example 1: sort(arr)
  //   example 1: $result = arr
  //   returns 1: ['Kevin', 'Zonneveld', 'van']
  //   example 2: ini_set('locutus.strictForIn', true)
  //   example 2: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: sort(fruits)
  //   example 2: $result = fruits
  //   returns 2: {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
  //        test: skip-1

  var i18n_loc_get_default = require('../i18n/i18n_loc_get_default')

  var valArr = [],
    keyArr = [],
    k = '',
    i = 0,
    sorter = false,
    that = this,
    strictForIn = false,
    populateArr = []

  switch (sort_flags) {
    case 'SORT_STRING':
    // compare items as strings
      sorter = function (a, b) {
        return that.strnatcmp(a, b)
      }
      break
    case 'SORT_LOCALE_STRING':
    // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
      var loc = i18n_loc_get_default()
      sorter = this.locutus.i18nLocales[loc].sorting
      break
    case 'SORT_NUMERIC':
    // compare items numerically
      sorter = function (a, b) {
        return (a - b)
      }
      break
    case 'SORT_REGULAR':
    // compare items normally (don't change types)
    default:
      sorter = function (a, b) {
        var aFloat = parseFloat(a),
          bFloat = parseFloat(b),
          aNumeric = aFloat + '' === a,
          bNumeric = bFloat + '' === b
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0
        } else if (aNumeric && !bNumeric) {
          return 1
        } else if (!aNumeric && bNumeric) {
          return -1
        }
        return a > b ? 1 : a < b ? -1 : 0
      }
      break
  }

  // BEGIN REDUNDANT
  try {
    this.locutus = this.locutus || {}
  } catch (e) {
    this.locutus = {}
  }

  this.locutus.ini = this.locutus.ini || {}
  // END REDUNDANT
  strictForIn = this.locutus.ini['locutus.strictForIn'] && this.locutus.ini['locutus.strictForIn'].local_value && this.locutus
    .ini['locutus.strictForIn'].local_value !== 'off'
  populateArr = strictForIn ? inputArr : populateArr

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k])
      if (strictForIn) {
        delete inputArr[k]
      }
    }
  }

  valArr.sort(sorter)

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i]
  }
  return strictForIn || populateArr
}