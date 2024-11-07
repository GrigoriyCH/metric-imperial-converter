const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.2L'), 3.2);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('5.5/2L'), 2.75);
  });

  test('convertHandler should correctly return an error on a double-fraction', function() {
    assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('L'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    inputUnits.forEach(unit => {
      assert.equal(convertHandler.getUnit(unit), unit);
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    const unitPairs = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    for (let unit in unitPairs) {
      assert.equal(convertHandler.getReturnUnit(unit), unitPairs[unit]);
    }
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const spellOutUnits = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    for (let unit in spellOutUnits) {
      assert.equal(convertHandler.spellOutUnit(unit), spellOutUnits[unit]);
    }
  });

  test('convertHandler should correctly convert gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('convertHandler should correctly convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('convertHandler should correctly convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });

});
