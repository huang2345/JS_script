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
  let bg = new Image();
  bg.src = bg_url;
  let style = document.createElement("style");
  let overflowHeight = 0;
  let imageOverflowStyleString;
  document.head.appendChild(style);
  //为bg添加style以及设置属性
  {
    bg.style.setProperty("position", "fixed");
    bg.style.setProperty("top", "0");
    bg.style.setProperty("left", "0");
    bg.style.setProperty("width", "100%");
    bg.style.setProperty("z-index", "-1");
  }

  let bg_id = window.setInterval(() => {
    let body = document.body;
    let del_bg = document.querySelector("div#app > div.bg");
    if (del_bg != null) del_bg.remove();
    if (body != null) {
      body.appendChild(bg);
      //假定body加载完成时bg加载完成
      if (bg.complete && bg.offsetHeight > 0 && bg.offsetWidth > 0) {
        let elementWidth = bg.offsetWidth;
        let elementHeight = bg.offsetHeight;
        console.log("元素宽度: " + elementWidth + "px");
        console.log("元素高度: " + elementHeight + "px");

        let backgroundWidth = bg.naturalWidth;
        let backgroundHeight = bg.naturalHeight;
        console.log("图片宽度: " + backgroundWidth + "px");
        console.log("图片高度: " + backgroundHeight + "px");

        let innerWidth = window.innerWidth;
        let innerHight = window.innerHeight;
        console.log("窗口宽度: " + innerWidth + "px");
        console.log("窗口高度: " + innerHight + "px");
        // 计算溢出尺寸
        let overflowWidth = elementWidth - innerWidth;
        overflowHeight = elementHeight - innerHight;

        console.log("溢出宽度: " + overflowWidth + "px");
        console.log("溢出高度: " + overflowHeight + "px");
        imageOverflowStyleString = `:root{\n
            --image-overflow-height:${overflowHeight}px;\n
        `;
        style.innerHTML = imageOverflowStyleString + `}`;
        window.clearInterval(bg_id);
      }
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
    let bg_now_y = 0;
    document.body.addEventListener("mousemove", (e) => {
      let mousemove_y = e.clientY;
      let splitLine = window.innerHeight / 2;
      if (mousemove_y < splitLine) {
        bg.style.setProperty("animation-name", "imageUp");
        bg.style.setProperty("animation-iteration-count", "1");
        bg.style.setProperty("animation-play-state", "running");
        bg.style.setProperty("animation-fill-mode", "forwards");
        //时间=路程/速度(100px/s)
        let time = (overflowHeight - bg_now_y) / 100;
        bg.style.setProperty("animation-duration", time + "s");
      } else {
        bg.style.setProperty("animation-name", "imageDown");
        let time = (overflowHeight - bg_now_y) / 100;
        bg.style.setProperty("animation-duration", time + "s");
      }
    });
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
