// ==UserScript==
// @name         老王论坛自动添加提取码
// @namespace    http://tampermonkey.net/
// @version      0.2
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

    //正则表达式
    let extractReExp = /提取/;
    let extractCodeReExp = /[a-zA-Z0-9]+/g;
    let downReExp = /下载/g;

    //获取到的提取码和百度网盘链接
    let extractCode = "";
    let baiduLink = "";
    let baidu_a;

    if (!downDiv) {
      console.log("未找到下载区域");
      return false;
    }
    //先获取到提取码
    for (let i of downts) {
      //临时存储match返回值的变量，如果为null，则说明没有匹配到提取码
      let matchRetrunValue = i.textContent.match(extractReExp);
      if (matchRetrunValue) {
        let matchRetrunValue2 = i.textContent.match(extractCodeReExp);
        if (matchRetrunValue2) {
          extractCode += matchRetrunValue2[0];
          console.log("提取码:" + extractCode);
          break;
        } else {
          console.error("未找到提取码");
          return false;
        }
      } else {
        console.error("未找到提取区域");
      }
    }
    //获取到百度网盘链接
    for (let i = 0; i < downts.length; i++) {
      let matchRetrunValue = downts[i].textContent.match(downReExp);
      if (matchRetrunValue) {
        baidu_a = downts[i].querySelector("a");
        if (baidu_a) {
          baiduLink = baidu_a.href;
          console.log("百度网盘链接:" + baiduLink);
          break;
        } else {
          console.error("未找到百度网盘链接");
          return false;
        }
      } else {
        console.log("未找到有能匹配到下载字符的区域");
      }
    }
    //判断获取到的百度网盘链接是否自带了提取码
    if (baiduLink.match(extractCode)) {
      console.log("百度网盘链接已存在提取码");
      return true;
    } else {
      //拼接提取码
      baidu_a.href += "?pwd=" + extractCode;
      console.log("已添加提取码");
      return true;
    }
  }
  let id = window.setInterval(() => {
    //开关
    let t = addCode();
    if (t) {
      clearInterval(id);
    }
  }, 1000);
  //   window.setTimeout(addCode, 2000);
})();
