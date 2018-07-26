/**
 * Utility functions
 */
const get = selector => document.getElementById(selector);
const getText = selector => get(selector).value;
const set = (selector, value) => document.getElementById(selector).innerHTML = value;
const setValue = (selector, value) => document.getElementById(selector).value = value;
// const flatten = arr => [].concat.apply([], arr);

/*
1 2 3 4
234 2345
2,3,5,8, qq
=>
[1,2,2,3,3,4,5,8,234,2345]
*/
const getArray = str => {
  const regex = /[^a-zA-Z\W]*/gm;
  const result = [];

  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m.forEach((match, groupIndex) => {
      if (match !== '') {
        result.push(parseInt(match, 10));
      }
    });
  }
  return result.sort((a, b) => a - b);
}

/**
 * Maths functions for averages
 */
const total = numbers => numbers.reduce((a, b) => a + b, 0);

const range = numbers => numbers[numbers.length - 1] - numbers[0];

const count = numbers => numbers.length;

const mean = numbers => total(numbers) / numbers.length;

const median = numbers => {
  const middle = Math.round(numbers.length / 2);
  return numbers[middle];
};

const mode = numbers => {
  // Make frequency object
  const freq = numbers.reduce((acc, curr) => {
    if (typeof acc[curr] == 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});

  // Find the number with the largest frequency
  let maxFreq = 0;
  let maxItem = 0;
  Object.entries(freq).forEach(([key, value]) => {
    if (value > maxFreq) {
      maxFreq = value;
      maxItem = key;
    }
  });
  return maxItem;
};

const calculate = () => {
  const text = getText('numbers');
  const numbers = getArray(text);

  setValue('numbers', JSON.stringify(numbers));
  set('total', total(numbers));
  set('range', range(numbers));
  set('count', count(numbers));
  set('mean', mean(numbers));
  set('median', median(numbers));
  set('mode', mode(numbers));
};
