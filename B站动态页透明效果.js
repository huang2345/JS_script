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
    //为其内各个不同的盒子设置背景颜色为透明
    setBackgroundColor(dyn_item);
    let selectedList = [
      ".bili-dyn-card-video__body", //视频
      ".bili-dyn-content__orig", //动态
      ".dyn-reserve__card", //预约
      ".bili-dyn-card-live__body", //直播
      ".dyn-ugc__wrap", //引用了视频
      ".dyn-goods__wrap", //带货
      ".bili-dyn-card-pgc__body", //番剧
    ];
    let body;
    //一个消息可能会包含相同的部分，例如动态会包含预约和转发的视频，并且不能保证最后一个元素存在
    let body_trueArray = [];
    for (let i of selectedList) {
      body = list_item.querySelector(i);
      if (body) {
        setBackgroundColor(body);
        body_trueArray.push(body);
      }
    }
    body = body_trueArray[0];
    if (body != null) {
      if (list_item.querySelector("a.bili-dyn-card-video")) {
        list_item
          .querySelector("a.bili-dyn-card-video")
          .style.setProperty("border-color", "rgba(255, 255, 255, 0)");
      }
      //设置B站动态引用的音乐的边框为透明
      if (list_item.querySelector(".bili-dyn-card-music")) {
        list_item
          .querySelector(".bili-dyn-card-music")
          .style.setProperty("border-color", "rgba(255, 255, 255, 0)");
      }
      //设置展开x条相关动态的盒子的上边框颜色为透明
      else if (list_item.querySelector(".border-top")) {
        list_item
          .querySelector(".border-top")
          .style.setProperty("border-color", "rgba(255, 255, 255, 0)");
      }
      //设置B站动态引用的直播的边框为透明
      else if (list_item.querySelector(".bili-dyn-card-live")) {
        list_item
          .querySelector(".bili-dyn-card-live")
          .style.setProperty("border-color", "rgba(255, 255, 255, 0)");
      } else if (list_item.querySelector(".bili-dyn-card-pgc")) {
        list_item
          .querySelector(".bili-dyn-card-pgc")
          .style.setProperty("border-color", "rgba(255, 255, 255, 0)");
      }
    }
    //监听每个动态的评论按钮
    list_item;
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
  //计算图片的溢出尺寸
  function getOverflowHeight() {
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
      bg_now_y = 0;
      window.clearInterval(bg_id);
    }
  }
  //
  //
  //
  //
  let bg_url =
    "https://raw.githubusercontent.com/huang2345/JS_script/master/test.jpg";
  var bg = new Image();
  bg.src = bg_url;
  var overflowHeight = 0;
  //为bg添加style以及设置属性
  {
    bg.style.setProperty("position", "fixed");
    bg.style.setProperty("top", "0");
    bg.style.setProperty("left", "0");
    bg.style.setProperty("width", "100%");
    bg.style.setProperty("z-index", "-1");
  }

  var bg_id = window.setInterval(() => {
    let body = document.body;
    let del_bg = document.querySelector("div#app > div.bg");
    if (del_bg != null) del_bg.remove();
    if (body != null) {
      body.appendChild(bg);
      getOverflowHeight();
    }
  }, 100);
  //窗口大小改变时重新计算溢出尺寸
  let resizeTimer;
  //定时器防抖
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      getOverflowHeight();
      bg.style.setProperty("top", "0");
    }, 300);
  });

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
  var bg_now_y = 0;
  {
    bg.style.setProperty("transition-property", "top");
    let animeID;
    let animeRunning = false;
    function move_bg(e) {
      let mousemove_y = e.clientY;
      let splitLine = window.innerHeight / 2;
      let speed = Math.round(overflowHeight / 100);
      if (overflowHeight > 0) {
        if (mousemove_y < splitLine) {
          //时间=路程/速度(100px/s)
          let time = 1 / 100;
          bg_now_y += speed;
          if (bg_now_y > 0) {
            bg_now_y = 0;
          }
          bg.style.setProperty("top", bg_now_y + "px");
          bg.style.setProperty("transition-duration", time + "s");
        } else {
          let time = 1 / 100;
          bg_now_y -= speed;
          if (bg_now_y < -overflowHeight) {
            bg_now_y = -overflowHeight;
          }
          bg.style.setProperty("top", bg_now_y + "px");
          bg.style.setProperty("transition-duration", time + "s");
        }
        animeID = window.requestAnimationFrame(() => {
          move_bg(e);
        });
      }
    }
    document.body.addEventListener("mouseover", (e) => {
      if (!animeRunning) {
        animeID = window.requestAnimationFrame(() => {
          move_bg(e);
        });
        animeRunning = true;
      }
    });
    document.body.addEventListener("mouseout", (e) => {
      window.cancelAnimationFrame(animeID);
      animeRunning = false;
    });
  }

  getAndSetBackgroundColor("aside.left div.bili-dyn-live-users");
  //由于tabs点击后会刷新元素，所以需要重新设置背景色
  {
    getAndSetBackgroundColor("div.bili-dyn-list-tabs");
    let tab_id = window.setInterval(() => {
      let tabs = document.querySelector("div.bili-dyn-list-tabs");
      if (tabs) {
        tabs.addEventListener("click", () => {
          getAndSetBackgroundColor("div.bili-dyn-list-tabs");
        });
        window.clearInterval(tab_id);
      }
    }, 1000);
  }
  getAndSetBackgroundColor("div.bili-dyn-publishing");
  getAndSetBackgroundColor(
    "div.bili-dyn-publishing div.bili-rich-textarea__inner"
  );
  getAndSetBackgroundColor("div.bili-dyn-up-list");
  // Your code here...
})();
