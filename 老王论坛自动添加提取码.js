// ==UserScript==
// @name         老王论坛自动添加提取码
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  仅限百度网盘
// @license      MIT
// @author       You
// @match        https://laowang.vip/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // Your code here...

  //.downinput
  function addCode() {
    let downDiv = document.querySelector(".downinput");
    let downts = downDiv.querySelectorAll(".downt");
    let reg1 = /提取码：([a-zA-Z0-9]+)/;
    let reg2 = /点击下载/;
    let link;
    let code;

    if (!downDiv) {
      console.log("未找到下载区域");
      return false;
    }

    downts.forEach((item) => {
      let tempLink = item.children[0];
      let tempLinkText = tempLink.innerText;

      if (tempLink && tempLinkText.match(reg2)) {
        link = tempLink.children[0];
        console.log("找到度盘链接", link);
      }
      if (tempLinkText && tempLinkText.match(reg1)) {
        code = tempLinkText.match(reg1)[1];
        if (code) {
          console.log("code未加载");
          return false;
        }
        console.log("找到提取码", code);
      }
    });
    if (link) {
      let linkHrefEnd4 = link.href.slice(-4);
      if (linkHrefEnd4 == code) {
        console.log("提取码已存在");
        return true;
      } else {
        link.href = link.href + `?pwd=${code}`;
        console.log("提取码已添加");
        return true;
      }
    }
    return false;
  }
  let intervalId = setInterval(() => {
    if (addCode()) {
      clearInterval(intervalId);
    }
  }, 800);
})();
