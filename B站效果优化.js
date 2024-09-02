// ==UserScript==
// @name         优化B站效果
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  try to take over the world!
// @author       O.k
// @match        https://t.bilibili.com/?tab=*
// @match        https://t.bilibili.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  console.log("B站效果优化");
  function delDOMNode(array) {
    for (let i = 0; i < array.length; i++) {
      let promise = new Promise((resolve, reject) => {
        let tempID = window.setInterval(() => {
          let temp = document.querySelector(array[i]);
          if (temp) {
            resolve(temp);
            window.clearInterval(tempID);
          }
        }, 100);
      }).then((node) => {
        node.remove();
      });
    }
  }
  /*
    .bili-dyn-version-control__reminding
    .right
    */
  //删除节点
  let delArray = [
    ".bili-dyn-version-control__reminding",
    ".right",
    ".bili-dyn-version-control__btn",
  ];
  delDOMNode(delArray);

  // 调整main区（主内容区）的宽度，由于暂时不太懂怎么引用vue，所以先这样写
  let MainintervalId = setInterval(() => {
    let main = document.getElementsByTagName("main")[0];
    if (main) {
      main.style.width = window.innerWidth * 0.7 + "px";
      clearInterval(MainintervalId);
    }
  });

  //调大部分区域的字体
  //.bili-rich-text__content defalut:14px
  //.bili-dyn-interaction__item__desc defalut:13px
  //.bili-dyn-card-video__title
  //.bili-dyn-card-video__desc
  let fontStyle = document.createElement("style");
  //paratext:副文本
  let fontStyleString =
    `:root{\n
    --body-text: 18px;\n
    --paratext: 16px;\n
}\n` +
    `.bili-rich-text__content,.bili-dyn-card-video__title{\n
    font-size: var(--body-text) !important;\n
}\n` +
    `.bili-dyn-interaction__item__desc,.bili-dyn-card-video__desc{\n
    font-size: var(--paratext) !important;\n
}\n`;
  fontStyle.innerHTML = fontStyleString;
  let headIntervalId = setInterval(() => {
    let head = document.head;
    if (head) {
      head.appendChild(fontStyle);
      clearInterval(headIntervalId);
    }
  }, 100);

  //当鼠标悬浮并按下s键时，将那个视频添加到稍后再看
  //.bili-dyn-card-video 视频整体
  //.bili-dyn-card-video__mark 稍后再看按钮
  let clickEvent = new Event("click", { bubbles: true, cancelable: true });

  let videoList = [];
  //保存当前悬浮的视频的稍后再看按钮，用来给hoverAndCtrlEvent事件响应函数精确地获取当前悬浮的视频的稍后再看按钮
  //v1.1修改为添加稍后再看的同时为视频点赞
  let see_later;
  let like_button;
  let key = "s";
  //添加给body的事件，当鼠标悬浮并按下s键时，将鼠标悬浮的那个视频添加到稍后再看
  function hoverAndCtrlEvent(e) {
    console.log("hover-and-key:s");
    if (e.key == key) {
      see_later.click();
      if (like_button.getAttribute("class").indexOf("active") == -1) {
        console.log("you like it");
        like_button.click();
      }
    }
  }
  function like(e) {
    if (e.key == "d") {
      console.log("like");
      like_button.click();
    }
  }
  //为当前视频投稿右边添加一个按钮，点击后将视频添加到稍后再看并点赞
  function setButton(item) {
    let div = document.createElement("div");
    let container = document.createElement("div");
    let canvas = document.createElement("canvas");
    //对原布局进行调整
    {
      let item_body = item.querySelector(".bili-dyn-item__body");
      item_body.style.setProperty("display", "grid");
      item_body.style.setProperty("grid-template-rows", "1fr");
      item_body.style.setProperty("grid-template-columns", "repeat(2,1fr)");

      container.style.setProperty("grid-template-rows", "1fr");
      container.style.setProperty("grid-template-columns", "129px 1fr");
      container.style.setProperty("display", "grid");
      container.style.setProperty("gap", "20px");

      canvas.setAttribute("width", "129");
      canvas.setAttribute("height", "105");
      canvas.style.setProperty("margin-top", "auto");

      container.append(div);
      container.append(canvas);
      if (item_body.querySelector(".bili-dyn-item__interaction") == null) {
        item_body.appendChild(container);
      } else {
        item_body.insertBefore(
          container,
          item_body.querySelector(".bili-dyn-item__interaction")
        );
      }
    }
    {
      div.style.setProperty("border", "1px solid #d3d3d3");
      div.style.setProperty("background-color", "#66ccff");
      div.style.setProperty("border-radius", "50%");
      div.style.setProperty("height", "129px");
      div.style.setProperty("width", "129px");
      div.style.setProperty("margin-top", "auto");
      div.style.setProperty("z-index", 1);
      //影响居中
      div.style.setProperty("display", "grid");
    }
    //为按钮增加动画效果
    let animation = document.createElement("div");
    {
      animation.style.setProperty("position", "relative");
      animation.style.setProperty("width", "0px");
      animation.style.setProperty("height", "0px");
      animation.style.setProperty("border-radius", "50%");
      animation.style.setProperty("background-color", "#d3d3d3");
      animation.style.setProperty("z-index", "2");
      //用于居中
      animation.style.setProperty("margin", "0 auto");
      animation.style.setProperty("align-self", "center");

      animation.style.setProperty("transition", "all 0.3s");
      animation.style.setProperty("overflow", "hidden");
      animation.style.setProperty("text-align", "center");
      animation.style.setProperty("line-height", "129px");
      animation.style.setProperty("font-size", "25px");
      animation.style.setProperty("color", "white");
      animation.textContent = "已成功";
      div.appendChild(animation);
    }
    div.addEventListener("click", () => {
      if (animation.style.getPropertyValue("width") == "0px") {
        animation.style.setProperty("width", "129px");
        animation.style.setProperty("height", "129px");
      } else {
        animation.style.setProperty("width", "0px");
        animation.style.setProperty("height", "0px");
      }
      try {
        see_later.click();
        if (like_button.getAttribute("class").indexOf("active") == -1) {
          console.log("you like it");
          like_button.click();
        }
      } catch (e) {
        console.error(e);
      }
    });
    //第二次更改方案难以使用，其思路是使用ctx操作像素实现动画，但是由于data:image的图像不是纯色，难以筛选，故放弃
    //第三方案，思路是自己绘制路径，然后用clip裁剪以及lineTo的线条(从下到上)，实现动画，像素操作过于难了，而且浪费性能
    //按钮右侧复制一个点赞
    let like_border = new Path2D(
      "M9.72 31.95h2.5V12.37h-2.5zM24.44 9.73h10.42a4.15 4.15 0 013.33 1.67 4.38 4.38 0 01.56 3.47L34.3 29.59a6.37 6.37 0 01-6 4.86H5a4.52 4.52 0 01-4.31-2.36 5.61 5.61 0 01-.69-2.5V14.73a4.93 4.93 0 012.5-4.31A8.38 8.38 0 015 9.73h6.25l6.8-8.49a3.83 3.83 0 016.64 2.94zm10.14 2.51H21.66l.28-2.92.42-5.14a1.26 1.26 0 00-.18-1 1.28 1.28 0 00-.82-.56 1.11 1.11 0 00-1.25.42l-6.36 8.2-.83 1.11H4.58a2 2 0 00-.83.28 2.28 2.28 0 00-1.25 2.08v14.88a2 2 0 00.42 1.25A2 2 0 005 31.95h23.33a2.38 2.38 0 001.39-.41 3.61 3.61 0 002.08-2.78l4.44-14.58 2.5.56-2.5-.56a2.45 2.45 0 00-.14-1.39 2.89 2.89 0 00-1.52-.54l.28-2.5z"
    );
    let like_clip = new Path2D(
      "M9.72 31.95M24.44 9.73h10.42a4.15 4.15 0 013.33 1.67 4.38 4.38 0 01.56 3.47L34.3 29.59a6.37 6.37 0 01-6 4.86H5a4.52 4.52 0 01-4.31-2.36 5.61 5.61 0 01-.69-2.5V14.73a4.93 4.93 0 012.5-4.31A8.38 8.38 0 015 9.73h6.25l6.8-8.49a3.83 3.83 0 016.64 2.94z"
    );
    try {
      let ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("ctx is null");
      ctx.save();
      ctx.scale(3, 3);
      ctx.fillStyle = "#d3d3d3";
      ctx.fill(like_border);
      //为鼠标移入移出以及点击时添加效果
      function mouseoverEvent(e) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00a1d6";
        ctx.fill(like_border);
        ctx.save();
        ctx.clip(like_clip);
      }
      canvas.addEventListener("mouseover", mouseoverEvent);
      function mouseoutEvent(e) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#d3d3d3";
        ctx.fill(like_border);
      }
      canvas.addEventListener("mouseout", mouseoutEvent);
      canvas.addEventListener("click", (e) => {
        ctx.fillStyle = "#00a1d6";
        requestAnimationFrame(clickAnimeFunction);
        like_button.click();
      });
      let clickAnimeFunction = clickAnime.bind();
      let animeTime = 0;
      //用于实现反向动画
      function clickAnime() {
        if (canvas.height - animeTime < 0) {
          window.cancelAnimationFrame(clickAnimeFunction);
          animeTime = 0;
          //   canvas.addEventListener("mouseout", mouseoutEvent);
          console.log("anime end");
          return;
        }
        ctx.fillRect(0, canvas.height - 10 - animeTime, canvas.width, 3);
        animeTime += 3;
        window.requestAnimationFrame(clickAnimeFunction);
      }
    } catch (e) {
      console.error(e);
    }
  }
  //将显示视频时长的文字转移到播放量旁边
  function setVideoTimeFont(item) {
    let videoTime = item.querySelector(
      ".bili-dyn-card-video__duration"
    ).textContent;
    let positionNode = item.querySelector(".bili-dyn-item__footer");
    let newVideoTime = document.createElement("div");
    {
      newVideoTime.style.setProperty("width", "92px");
      newVideoTime.style.setProperty("width", "48px");
      newVideoTime.style.setProperty("line-height", "48px");
      newVideoTime.style.setProperty("font-size", "20px");
    }
    newVideoTime.textContent = videoTime;
    positionNode.appendChild(newVideoTime);
  }
  setInterval(() => {
    let video = document.querySelectorAll(".bili-dyn-list__item");
    if (video.length > 0) {
      videoList = video;
      videoList.forEach((item) => {
        //通过querySelector确认有没有超链接标签<a>，过滤非视频的动态
        if (
          item
            .querySelector(".bili-dyn-content__orig__major")
            .querySelector("a") == null
        ) {
          return;
        }
        //鼠标悬浮且按下s
        if (item.getAttribute("data-userJs") == null) {
          console.log("add event");
          item.setAttribute("data-userJs", "true");
          setButton(item);
          setVideoTimeFont(item);
          item.addEventListener("mouseover", (e) => {
            //保存当前悬浮的视频的稍后再看按钮
            see_later = item.querySelector(".bili-dyn-card-video__mark");
            like_button = item.querySelector(".like");
            document.body.addEventListener("keydown", hoverAndCtrlEvent);
            document.body.addEventListener("keydown", like);
          });
          item.addEventListener("mouseout", (e) => {
            document.body.removeEventListener("keydown", hoverAndCtrlEvent);
            document.body.removeEventListener("keydown", like);
          });
        }
      });
    }
  }, 1000);
  // Your code here...
})();
