const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const lcm = (a, b) => a * b / gcd(a, b);
function smallestCommons(arr) {
  const [start, end] = [Math.min(...arr), Math.max(...arr)];
  const col = [];
  for (let i = start; i <= end; ++i) {
    col.push(i);
  }
  return col.reduce((common, cur) => lcm(common, cur));
}

function telephoneCheck(str) {
  if (str[0] === '-') return false;
  const left = str.indexOf('(');
  const right = str.indexOf(')');

  if ((left === -1 && right !== -1) || (left !== -1 && right === -1)) {
    return false;
  }
  if (left !== -1 && right !== -1 && right - left !== 4) return false;
  const tel = str.split(/[ \-()]+/).join('').trim();
  if (tel.length === 11) {
    return tel[0] == 1;
  }
  return tel.length === 10;
}

console.log(telephoneCheck('1 (555)-555-5555'));
