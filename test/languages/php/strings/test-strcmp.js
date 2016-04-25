// warning: This file is auto generated by `npm run build:tests`, do not edit by hand
XMLHttpRequest = {} // eslint-disable-line no-native-reassign
window = { // eslint-disable-line no-native-reassign
  window: {},
  document: {
    lastModified: 1388954399,
    getElementsByTagName: function () { return [] }
  },
  location: {
    href: ""
  }
}
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set') // eslint-disable-line no-unused-vars
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get') // eslint-disable-line no-unused-vars
var strcmp = require('/Users/kvz/code/phpjs/src/php/strings/strcmp.js')

describe('php.strings.strcmp.js', function () {
  it('should pass example 1', function (done) {
    strcmp( 'waldo', 'owald' )
    var expected = 1
    var result = strcmp( 'waldo', 'owald' )
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    strcmp( 'owald', 'waldo' )
    var expected = -1
    var result = strcmp( 'owald', 'waldo' )
    expect(result).to.deep.equal(expected)
    done()
  })
})