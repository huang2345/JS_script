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
            })
                .then((node) => {
                    node.remove();
                });
        }
    }
    /*
    .bili-dyn-version-control__reminding
    .right
    */
    //删除节点
    let delArray = ['.bili-dyn-version-control__reminding', '.right', '.bili-dyn-version-control__btn'];
    delDOMNode(delArray);




    // 调整main区（主内容区）的宽度，由于暂时不太懂怎么引用vue，所以先这样写
    let MainintervalId = setInterval(() => {
        let main = document.getElementsByTagName('main')[0];
        if (main) {
            main.style.width = window.innerWidth * 0.7 + 'px';
            clearInterval(MainintervalId);
        }
    })




    //调大部分区域的字体
    //.bili-rich-text__content defalut:14px
    //.bili-dyn-interaction__item__desc defalut:13px
    //.bili-dyn-card-video__title
    //.bili-dyn-card-video__desc
    let fontStyle = document.createElement('style');
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
    let clickEvent = new Event('click', { bubbles: true, cancelable: true });

    let videoList = [];
    //保存当前悬浮的视频的稍后再看按钮，用来给hoverAndCtrlEvent事件响应函数精确地获取当前悬浮的视频的稍后再看按钮
    //v1.1修改为添加稍后再看的同时为视频点赞
    let mark1;
    let mark2;
    let key = 's';
    //添加给body的事件，当鼠标悬浮并按下s键时，将鼠标悬浮的那个视频添加到稍后再看
    function hoverAndCtrlEvent(e) {
        console.log('keydown');
        if (e.key == key) {
            mark1.dispatchEvent(clickEvent);
            if(mark2.getAttribute('class').indexOf('active') == -1)
            {
                mark2.click();
            }
        }
    }
    function like(e)
    {
        if(e.key == 'd')
        {
            console.log('like');
            mark2.click();
        }
    }
    setInterval(() => {
        let video = document.querySelectorAll('.bili-dyn-card-video');
        if (video.length > 0) {
            videoList = video;
            videoList.forEach((item) => {
                //鼠标悬浮且按下s
                item.addEventListener('mouseover', (e) => {
                    //保存当前悬浮的视频的稍后再看按钮
                    mark1 = item.querySelector('.bili-dyn-card-video__mark');
                    mark2 = item.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.like');
                    document.body.addEventListener('keydown', hoverAndCtrlEvent);
                    document.body.addEventListener('keydown', like);
                });
                item.addEventListener('mouseout', (e) => {
                    document.body.removeEventListener('keydown', hoverAndCtrlEvent);
                    document.body.removeEventListener('keydown', like);
                })
            });
        }
    }, 1000);
    // Your code here...
})();