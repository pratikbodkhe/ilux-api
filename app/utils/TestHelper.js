/* eslint-disable no-console */
// Build Dynamic tests
const deepEqualInAnyOrder = require('deep-equal-in-any-order');

const chai = require('chai');
const { expect } = require('chai');
const { t } = require('typy');
const UndefinedAttribute = require('../errors/UndefinedAttribute');

chai.use(deepEqualInAnyOrder);

function process(response, elementPath, expected) {
  const arrayName = getArrayName(elementPath);
  let actual;
  let isFailed = false;
  const undefinedAttributes = [];
  if (arrayName !== '') {
    t(response, arrayName).safeObject.forEach((element) => {
      actual = t(element, getAttributeName(elementPath)).safeObject;
      if (typeof actual === 'undefined') {
        // showUndefinedError(elementPath, element.id);
        undefinedAttributes.push(element.id);
        isFailed = true;
      }
      expect(actual).to.not.eql(expected);
    });
    if (isFailed) {
      throw new UndefinedAttribute(`${elementPath} does not exist at \n ${format(undefinedAttributes)}`);
    }
  } else {
    actual = t(response, elementPath).safeObject;
    if (typeof actual === 'undefined') {
      throw new UndefinedAttribute(`${elementPath} does not exist`);
    }
    expect(actual).to.not.eql(expected);
  }
}

function notNull(response, elementPath) {
  process(response, elementPath, null);
}

// Assert Not Empty
function notEmpty(response, elementPath) {
  process(response, elementPath, '');
}

// Assert Equals
function equals(response, elementPath, expected) {
  const actual = t(response, elementPath).safeObject;
  if (typeof actual === 'undefined') {
    throw new UndefinedAttribute(`${elementPath} does not exist`);
  }
  expect(actual).to.eql(expected);
}

function deepEquals(response, elementPath, expected) {
  const actual = t(response, elementPath).safeObject;
  if (typeof actual === 'undefined') {
    throw new UndefinedAttribute(`${elementPath} does not exist`);
  }
  expect(actual).to.deep.equal(expected);
}

function getArrayName(elementPath) {
  if (elementPath.indexOf('[]') !== -1) {
    return elementPath.slice(0, elementPath.indexOf('[]'));
  }
  return '';
}

function getAttributeName(elementPath) {
  if (elementPath.indexOf('[]') !== -1) {
    return elementPath.slice(elementPath.indexOf('].') + 2, elementPath.length);
  }
  return '';
}

function format(array) {
  let formatted = '';
  array.forEach((element, i) => {
    formatted += `\t ${i + 1}) ${element}\n`;
  });
  return formatted;
}

module.exports = {
  notNull,
  notEmpty,
  equals,
  deepEquals,
  getArrayName,
  getAttributeName,
};
