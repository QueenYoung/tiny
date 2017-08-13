import helper from '../../helper';

const { randomColor, range } = helper;

// CSS 代码我就不写了, 用 flex 很容易.
// const element = document.querySelector('.wrapper');
const elements = document.querySelectorAll('.elementIWantToAnimate');
elements.forEach((element, i) => {
  element.style.left = `${i * 120}px`;
  element.style.background = randomColor();
});

function step(element) {
  let start = null;
  const dropHeight = 500;

  // 为了防止作用域污染, 所以用高阶函数.
  return function ani(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.top = `${Math.min(progress / 4, dropHeight)}px`;
    if (progress < dropHeight * 4) {
      requestAnimationFrame(ani);
    } else {
      // 最新 Chrome 支持的函数, 我只是用来玩玩的.
      // 为了防止出现兼容性问题, 应该使用 css 来写 @keyframe
      element.animate([
        { top: `${dropHeight}px` },
        { top: `${dropHeight - 60}px`, offset: 0.3 },
        { top: `${dropHeight}px`, offset: 0.5 },
        { top: `${dropHeight - 40}px`, offset: 0.6 },
        { top: `${dropHeight}px`, offset: 0.75 },
        { top: `${dropHeight - 20}px`, offset: 0.88 },
        { top: `${dropHeight}px` },
      ], 2000);
    }
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// a good promise chain 
// Range 是我写的一个帮助函数, 用来生成 [0, n) 的数组.
// Promise 这个东西虽然很重要,但是我知道你们暂时也不会去看.
range(0, elements.length).reduce((seq, n) =>
  seq
    .then(() => {
      requestAnimationFrame(step(elements[n]));
      return delay(100);
    }), Promise.resolve())
  .then(() => console.log('done'), (e) => console.log(e));
