// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  给动态页搞一个背景
// @author       o.k
// @license      MIT
// @match        https://t.bilibili.com/?tab=*
// @match        https://t.bilibili.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function setBackgroundColor(div) {
    div.style.setProperty("background-color", "rgba(255,255,255,0)");
  }
  function set_list_item(list_item) {
    let dyn_item = list_item.querySelector(".bili-dyn-item");
    setBackgroundColor(dyn_item);
    let video_body = list_item.querySelector(".bili-dyn-card-video__body");
    if (video_body != null) {
      setBackgroundColor(video_body);
      list_item
        .querySelector("a.bili-dyn-card-video")
        .style.setProperty("border-color", "rgba(255, 255, 255, 0)");
    } else return;
  }
  function getAndSetBackgroundColor(selector) {
    let id = window.setInterval(() => {
      let div = document.querySelector(selector);
      if (div != null) {
        setBackgroundColor(div);
        window.clearInterval(id);
      }
    }, 100);
  }
  //
  //
  //
  //
  let bg_url =
    "https://raw.githubusercontent.com/huang2345/JS_script/master/test.jpg";
  let bg_id = window.setInterval(() => {
    let bg = document.querySelector(".bg");
    console.log(bg);
    if (bg != null) {
      bg.style.setProperty("background-image", `url(${bg_url})`);
      //覆盖B站设置的opacity
      bg.style.setProperty("opacity", "1");
      window.clearInterval(bg_id);
    }
  }, 100);

  let list_item_id = window.setInterval(() => {
    let lists = document.querySelector(".bili-dyn-list__items");
    if (lists != null) {
      for (let list_item of lists.children) {
        if (list_item.getAttribute("data-background") == "true") continue;
        set_list_item(list_item);
        list_item.setAttribute("data-background", "true");
      }
    }
  }, 100);
  //为背景图片的上下移动提供服务
  {
    let button_1 = document.createElement("div");
    {
      button_1.style.setProperty("position", "fixed");
      button_1.style.setProperty("width", "100vh");
      button_1.style.setProperty("height", "20vh");
      button_1.style.setProperty("opecity", "1");
      button_1.style.setProperty("z-index", "100");
    }
    let button_2 = button_1.cloneNode(true);
    {
      button_1.style.setProperty("top", "0");
      button_2.style.setProperty("top", "80vh");
    }
    document.body.appendChild(button_1);
    document.body.appendChild(button_2);
    //添加事件
    button_1.addEventListener("mouseover", () => {});
  }

  getAndSetBackgroundColor("aside.left div.bili-dyn-live-users");
  getAndSetBackgroundColor("div.bili-dyn-list-tabs");
  getAndSetBackgroundColor("div.bili-dyn-publishing");
  getAndSetBackgroundColor(
    "div.bili-dyn-publishing div.bili-rich-textarea__inner"
  );
  getAndSetBackgroundColor("div.bili-dyn-up-list");
  // Your code here...
})();
