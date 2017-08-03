import helper from '../../helper';

const { randomColor, Range } = helper;

// const element = document.querySelector('.wrapper');
const elements = document.querySelectorAll('.elementIWantToAnimate');
elements.forEach((element, i) => {
  element.style.left = `${i * 120}px`;
  element.style.background = randomColor();
});

function step(element) {
  let start = null;
  const dropHeight = 500;
  return function ani(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.top = `${Math.min(progress / 4, dropHeight)}px`;
    if (progress < dropHeight * 4) {
      requestAnimationFrame(ani);
    } else {
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
  return new Promise(resolve => setTimeout(resolve, ms));
}

// a good promise chain 
Range(0, elements.length).reduce((seq, n) =>
  seq
    .then(() => {
      requestAnimationFrame(step(elements[n]));
      return delay(100);
    }), Promise.resolve())
  .then(() => console.log('done'), e => console.log(e));
