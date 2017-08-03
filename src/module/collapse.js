/**
 * 这个函数用来触发手风琴效果.
 * 其中要求触发元素带有 `data-toggle=collapse` 属性, 并且这个元素如果是 a 的话,
 * href 必须指向相应的被折叠元素, 否则需要配置 data-target 属性.
 * 这里面有一个魔法数字 height, 只是为了触发 transition 的动画出现.
 * 另外, 因为浏览器的问题, 我们似乎动态设置成 collapsing 属性后, 立刻改变 height 属性并不会
 * 触发 transition, 需要使用一个 Promise 来延时. 下面是其中用到的主要 class
 * .collapsing {
 *   position: relative;
 *   height: 0;
 *   overflow: 0;
 *   transition: height .4s ease;
 * }
 * .collapse {
 *   display: none;
 * }
 * .collapse.show {
 *   display: block;
 * }
 */
function accordion() {
  const togglerElements = document.querySelectorAll('[data-toggle=collapse]');
  function doSomething() {
    // 父元素用来保存目前展开的元素
    const parent = document.querySelector(this.getAttribute('data-parent'));
    const searchSel = this.tagName === 'A' ? 'href' : 'data-target';
    // the element which will be collapse;
    const coll = document.querySelector(this.getAttribute(searchSel));

    // transition 结束后, 根据 height 的属性来决定后续操作
    coll.addEventListener('transitionend', (e) => {
      const target = e.target;
      if (target.style.height === '200px') {
        target.className = 'collapse show';
        parent.setAttribute('data-expand', this.getAttribute(searchSel));
      } else {
        target.className = 'collapse';
      }
    });

    const __collapse = (element) => {
      element.className = 'collapsing';
      delay(0).then(() => {
        const height = element.style.height;
        element.style.height = height === '200px' ? '0' : '200px';
        parent.setAttribute('data-expand', '');
      });
    };

    return () => {
      __collapse(coll);
      const hasRef = parent.getAttribute('data-expand');
      const hasRefEle = hasRef && document.querySelector(`${hasRef}`);
      hasRefEle && __collapse(hasRefEle);
    };
  }
  togglerElements.forEach((element) => {
    element.addEventListener('click', doSomething.bind(element)());
  });

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default accordion;
