const get = selector => document.getElementById(selector);

const getValue = selector => parseInt(get(selector).value, 10);

const updateResult = (value) => document.getElementById('decimal').innerText = value;

const calculate = () => {
  const top = getValue('top');
  const bottom = getValue('bottom');
  console.log(top, bottom, top / bottom);
  updateResult(top / bottom);
};
