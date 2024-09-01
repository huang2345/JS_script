// ==UserScript==
// @name         网页效果调整
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  CSDN,webpack中文文档
// @author       O.k
// @match        https://blog.csdn.net/*/article/details/*
// @match        https://webpack.docschina.org/*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  //待删除项
  let delArray = [
    ".blog_container_aside",
    ".recommend-right_aside",
    ".csdn-side-toolbar",
    ".more-toolbox-new",
    ".first-recommend-box",
    ".recommend-item-box",
    ".recommend-box",
    ".recommend-box ",
    "div[class=sponsors]",
  ];

  for (let i = 0; i < delArray.length; i++) {
    let tempName = delArray[i];
    if (tempName == ".recommend-box") console.log(222);
    let tempID = window.setInterval(() => {
      let temp = document.querySelector(tempName);
      if (temp) {
        window.clearInterval(tempID);
        temp.remove();
      }
    }, 100);
  }
  //webpack中文文档调整
  let navClass = ".sidebar";
  let navID = window.setInterval(() => {
    let temp = document.querySelector(navClass);
    if (temp) {
      window.clearInterval(navID);
      temp.style.position = "fixed";
      temp.style.left = 0;
    }
  }, 100);

  // Your code here...
})();
