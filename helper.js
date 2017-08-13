const helper = {
  flatten(array = []) {
    return array.reduce(
      (res, ele) =>
        (Array.isArray(ele) ? res.concat(this.flatten(ele)) : res.concat(ele)),
      [],
    );
  },
  range(lower, upper) {
    function* ran() {
      let cur = lower;
      while (cur < upper) {
        yield cur++;
      }
    }
    return Array.from(ran());
  },
  $(selector) {
    const res = document.querySelectorAll(selector);
    return res.length === 1 ? res[0] : res;
  },
  randomColor() {
    return `#${(0x1000000 + ~~(Math.random() * (1 << 24))).toString(16).substr(1)}`;
  },
};
export default helper;
