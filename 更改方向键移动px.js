// ==UserScript==
// @name         更改方向键移动px
// @namespace    http://tampermonkey.net/
// @version      0.1
// @license      MIT
// @description  ScrollBy
// @author       You
// @match        http://*/*
// @match        https://*/*
// @match        *
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  let px = 4000;
  let clearTime = 100;
  document.body.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp") {
      let id = setInterval(() => {
        window.scrollBy(0, -px / clearTime);
      }, 1);
      setTimeout(() => {
        clearInterval(id);
      }, clearTime);
    } else if (e.key == "ArrowDown") {
      let id = setInterval(() => {
        window.scrollBy(0, px / clearTime);
      }, 10);
      setTimeout(() => {
        clearInterval(id);
      }, clearTime);
    }
  });
  // Your code here...
})();
