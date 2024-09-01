// ==UserScript==
// @name         优化B站效果
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       O.k
// @match        https://t.bilibili.com/?tab=*
// @match        https://t.bilibili.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    console.log('B站效果优化');
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
        console.log('you like it')
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
  function setButton(item)
  {
    let div = document.createElement('div');
    let container = document.createElement('div');
    //对原布局进行调整
    {
        let item_body = item.querySelector('.bili-dyn-item__body');
        item_body.style.setProperty('display', 'grid');
        item_body.style.setProperty('grid-template-rows', '1fr');
        item_body.style.setProperty('grid-template-columns', 'repeat(2,1fr)');

        container.style.setProperty('grid-template-rows','1fr');
        container.style.setProperty('grid-template-columns','129px 1fr');
        container.style.setProperty('display','grid');
        container.style.setProperty('gap','20px');
        container.append(div);
        if(item_body.querySelector('.bili-dyn-item__interaction') == null)
        {
            item_body.appendChild(container);
        }else{
            item_body.insertBefore(container,item_body.querySelector('.bili-dyn-item__interaction'));
        }
    }
    {
        div.style.setProperty('border', '1px solid #d3d3d3');
        div.style.setProperty('background-color','#66ccff');
        div.style.setProperty('border-radius', '50%');
        div.style.setProperty('height','129px');
        div.style.setProperty('width','129px');
        div.style.setProperty('margin-top','auto');
        div.style.setProperty('z-index',1);
    }
    //为按钮增加动画效果
    let animation = document.createElement('div');
    {
        animation.style.setProperty('position', 'relative');
        animation.style.setProperty('width', '0px');
        animation.style.setProperty('height', '0px');
        animation.style.setProperty('border-radius', '50%');
        animation.style.setProperty('background-color','#d3d3d3');
        animation.style.setProperty('z-index','2');
        animation.style.setProperty('margin','auto');
        animation.style.setProperty('transition','all 0.3s');
        animation.style.setProperty('overflow','hidden');
        animation.style.setProperty('text-align','center');
        animation.style.setProperty('line-height','129px');
        animation.style.setProperty('font-size','25px');
        animation.style.setProperty('color','white');
        animation.textContent = '已成功';
        div.appendChild(animation);
    }
    div.addEventListener('click',()=>{
        if(animation.style.getPropertyValue('width') == '0px')
        {
            animation.style.setProperty('width', '129px');
            animation.style.setProperty('height', '129px');
        }
        else{
            animation.style.setProperty('width', '0px');
            animation.style.setProperty('height', '0px');
        }
        try{
            see_later.click();
            if (like_button.getAttribute("class").indexOf("active") == -1) {
                console.log('you like it')
                like_button.click();
            }
        }catch(e){
            console.error(e);
        }
    });
    //按钮右侧复制一个点赞
    let like_button = item.querySelector('.like');
    let like_button_copy = like_button.cloneNode(true);
    //删除nodeType属性为3的节点，即text
    for(let i = 0;i < like_button_copy.childNodes.length;i++)
    {
        if(like_button_copy.childNodes[i].nodeType == 3)
        {
            like_button_copy.removeChild(like_button_copy.childNodes[i]);
        }
    }
    container.appendChild(like_button_copy);
    {
        like_button_copy.style.setProperty('margin-top','auto');
        like_button_copy.style.setProperty('width','129px')
        like_button_copy.style.setProperty('height','129px')
    }
    let like_i = like_button_copy.querySelector('i');
    {
        like_i.style.setProperty('width','129px')
        like_i.style.setProperty('height','129px')
        like_i.style.setProperty('background-size','129px')
        like_i.style.setProperty('bakcground-position','0')
        like_i.style.setProperty('margin','0')
    }

  }
  //将显示视频时长的文字转移到播放量旁边
  function setVideoTimeFont(item)
  {
    let videoTime = item.querySelector('.bili-dyn-card-video__duration').textContent;
    let positionNode = item.querySelector('.bili-dyn-item__footer');
    let newVideoTime = document.createElement('div');
    {
        newVideoTime.style.setProperty('width','92px');
        newVideoTime.style.setProperty('width','48px');
        newVideoTime.style.setProperty('line-height','48px');
        newVideoTime.style.setProperty('font-size','20px');
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
        if(item.querySelector('.bili-dyn-content__orig__major').querySelector('a') == null)
        {
            return;
        }
        //鼠标悬浮且按下s
        if(item.getAttribute('data-userJs') == null)
        {
            console.log('add event');
            item.setAttribute('data-userJs', 'true');
            setButton(item);
            setVideoTimeFont(item);
            item.addEventListener("mouseover", (e) => {
                //保存当前悬浮的视频的稍后再看按钮
                see_later = item.querySelector(".bili-dyn-card-video__mark");
                like_button = item.querySelector('.like');
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
