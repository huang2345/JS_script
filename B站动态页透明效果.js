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
    function set_list_item_css() {
        let cssText = `
        div.bili-dyn-item,
        div.bili-dyn-card-video__body,
        div.bili-dyn-content > div.bili-dyn-content__orig,
        div.dyn-reserve__card,
        div.bili-dyn-card-live__body,
        div.dyn-ugc__wrap,div.dyn-goods__wrap,
        div.bili-dyn-card-pgc__body,
        a.bili-dyn-card-common,
        div.bili-dyn-list-tabs{
            background-color: rgba(255, 255, 255, 0);
        }
        a.bili-dyn-card-video,
        a.bili-dyn-card-music,
        div > div.bili-dyn-item__extra.border-top,
        a.bili-dyn-card-live,
        a.bili-dyn-card-pgc,
        a.bili-dyn-card-common{
            border-color:rgba(255, 255, 255, 0);
        }
        /*设置评论区*/
        div.bb-comment,div.comment-header,div.bili-rich-textarea__inner{
            background-color: rgba(255, 255, 255, 0);
        }
        div.bb-comment .comment-header,
        .bb-comment div.bottom-page.center,
        .bb-comment .comment-send div.comment-emoji,
        div.bili-dyn-forward__more,
        div.bili-dyn-forward-publishing__editor,
        .bb-comment .comment-list div.list-item .con{
            border-color:rgba(255, 255, 255, 0);
        }
        .bb-comment .comment-send .textarea-container div.ipt-txt{
            background-color: rgba(255, 255, 255, 0);
            border-color:rgba(255, 255, 255, 0);
        }
        .bb-comment .comment-send div.comment-emoji{
            box-shadow: none;
        }
        /*设置评论*/
        /*设置评论的输入框*/
        .bb-comment .comment-send div.textarea-container{
            width:100px;
            height:100px;
            margin-left: 110px;
            border-radius: 50px;
            transition-property: width;
            transition-duration: 0.7s;
        }
        .bb-comment .comment-send .textarea-container textarea.ipt-txt
        {
            width:100px;
            height:100px;
            border-radius: 50px;
            transition-property: width,background-color;
            transition-duration: 0.7s;

            font-size: 20px;
            overflow: hidden;
            padding-left: calc(10px + 30px);
        }
        .bb-comment .comment-send .textarea-container textarea.ipt-txt:focus{
            width: calc(100% - 20px);
            background-color: rgba(255, 255, 255, 0.8);
        }
        .bb-comment .comment-send div.textarea-container.focus{
            width:75%;
        }
        .bb-comment .comment-send .textarea-container textarea.ipt-txt::placeholder{
            color: rgba(255, 255, 255, 0);
        }
        /*设置评论的输入框左边的头像*/
        .bb-comment .comment-send > div.user-face{
            width:100px !important;
            height:100px !important;
        }
        .bb-comment .comment-send > div.user-face div.bili-avatar{
            width:100px !important;
            height:100px !important;
        }
        /*设置右边的提交按钮上下居中*/
        .bb-comment .comment-send button.comment-submit{
            top:18px;
        }
        /*设置鼠标悬浮在某一条评论时的效果*/
        div.comment-list > div.list-item{
            border-radius: 50px;
            transition: background-color 0.2s;
        }
        div.comment-list > div.list-item:hover{
            background-color: #80deea;
        }
        /*设置查看up动态那一栏*/
        main > section .bili-dyn-up-list{
            background-color: #7986cb;
            border-radius: 50px;
        }
        div > div.bili-dyn-up-list__item__face{
            border: none;
            box-shadow: none;
            width: 50px;
            height:50px;
            transition-property: width,height;
            transition-duration: 0.7s;
        }
        div > div.bili-dyn-up-list__item__face:hover{
            width:72px;
            height:72px;
        }
        div.bili-dyn-up-list__prev,div.bili-dyn-up-list__next{
            transition-property: opacity;
            transition-duration: 0.7s;
            filter: brightness(10);
            opacity: 0;
        }
        main > section:hover .bili-dyn-up-list__prev,main > section:hover .bili-dyn-up-list__next{
            opacity: 1;
        }
        /*设置左侧的正在直播栏*/
        div#app aside.left > section.sticky{
            z-index: 20;
        }
        .bili-dyn-live-users > .bili-dyn-live-users__body{
            --item-height: 50px;
            --item-width: 50px;
            --background-color: #66ccff;
            width: 100px;
            display: flex;
            flex-flow: column nowrap;
            padding: 20px 0;
            background-color: var(--background-color);
            /*设置z-index使背景色不混合导致颜色出错*/
            z-index: 0;
            border-radius: 50px;
            gap: 10px;
        }
        div.bili-dyn-live-users__item{
            width: var(--item-width);
            flex-basis: var(--item-height);
            margin: 0 25px;
            padding: 0;
            overflow: hidden;
            border-radius: 50px;
            background-color: red;
            /*设置z-index使背景色不混合导致颜色出错*/
            z-index: 1;
            transition-property: width,flex-basis,margin;
            transition-duration: 0.7s;
        }
        div.bili-dyn-live-users__item__face-container,div.bili-dyn-live-users__item__face{
            width: var(--item-width);
            height: var(--item-height);
            transition-property: width,height;
            transition-duration: 0.7s;
        }
        div.bili-dyn-live-users__item__right{
            justify-content: center;
        }
        div.bili-dyn-live-users__item__right > div{
            color: white;
            font-size: 15px;
        }
        .bili-dyn-live-users__item:hover{
            width: 250px;
            flex-basis: 76px;
            margin: 0 12px;
        }
        .bili-dyn-live-users__item:hover div.bili-dyn-live-users__item__face-container,
        .bili-dyn-live-users__item:hover div.bili-dyn-live-users__item__face 
        {
            width: 76px;
            height: 76px;
        }
        /*设置鼠标悬浮在一条动态的效果*/
        .bili-dyn-content{
            padding: 20px;
            border-radius: 20px;
            transition-property: background-color;
            transition-duration: 0.7s;
        }
        .bili-dyn-item:hover .bili-dyn-content{
            background-color: #90CAF9;
        }
        .bili-dyn-item:hover .bili-dyn-item__header{
            background-color: #F3E5F5;
        }
        .bili-dyn-item:hover div.bili-dyn-item__more{
            background-color: #BA68C8;
        }
        .bili-dyn-item:hover div.bili-dyn-title,.bili-dyn-item:hover div.bili-dyn-item__desc{
            padding-left: 30px;
        }
        .bili-dyn-item__header{
            width:532px;
            position: relative;
            border-radius: 20px;
            transition-property: background-color;
            transition-duration: 0.7s;
        }
        .bili-dyn-title{
            transition: padding-left 0.7s;
        }
        .bili-dyn-item__desc{
            width:max-content;
            transition: padding-left 0.7s;
        }
        div.bili-dyn-item__ornament{
            width:max-content;
            right: 30px;
            top: 27px;
        }
        div.bili-dyn-item__more{
            top: 35px;
            right: 5px;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            transition: background-color 0.7s;
        }
        div.bili-dyn-more__btn{
            right: 2px;
        }
        /*设置tabs*/
        div.bili-dyn-list-tabs{
            border-radius: 20px;
            transition-property: background-color;
            transition-duration: 0.7s;
        }
        div.bili-dyn-list-tabs:hover{
            background-color: #90CAF9;
        }
        /*设置发动态的那一栏*/
        main > section:first-child{
            display: flex;
        }
        div.bili-dyn-publishing{
            height: 0px;
            flex: 1;
            display: none;
            background-color: #8d6e63;
            border-radius: 50px;
            transition-property: height;
            transition-duration: 0.4s;
        }
        main > section .bili-user-button{
            max-width:100px;
            height:100px;
            text-align: center;
            line-height: 100px;
            background-color: #66ccff;
            border-radius: 50px;
            color: white;
            transition-property: background-color,color;
            transition-duration: 0.4s;
            flex:1 100px;
        }

    `;
        let style = document.createElement("style");
        style.innerHTML = cssText;
        document.head.appendChild(style);
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
    let bg_url = "https://192.168.0.100:10000/ghs/1.jpg";
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

    //设置样式
    let css_id = window.setInterval(() => {
        if (document.head != null) {
            set_list_item_css();
            window.clearInterval(css_id);
        }
    }, 100);
    //清除一些行内样式
    let clearDivStyle = window.setInterval(() => {
        let items = document.querySelector(".bili-dyn-list__items");
        if (items) {
            for (let item of items.children) {
                let comment_button = item.querySelector(
                    ".bili-dyn-item__footer .comment"
                );
                if (comment_button) {
                    if (
                        comment_button.getAttribute(
                            "data-setClearStyleEventSuccess"
                        ) == "true"
                    )
                        continue;
                    comment_button.addEventListener("click", () => {
                        let id = window.setInterval(() => {
                            let element = item.querySelector(".bili-avatar");
                            if (element) {
                                element.style = "";
                                window.clearInterval(id);
                            }
                        });
                    });
                    comment_button.setAttribute(
                        "data-setClearStyleEventSuccess",
                        "true"
                    );
                }
            }
            window.clearInterval(clearDivStyle);
        }
    }, 1000);
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
    //设置查看UP动态那一栏
    {
        let all;
        let next;
        let prev;
        let upList;
        let upList_content;
        let id = window.setInterval(() => {
            all = document.querySelector("div.bili-dyn-up-list");
            if (all) {
                {
                    prev = all.querySelector(".bili-dyn-up-list__prev");
                    next = all.querySelector(".bili-dyn-up-list__next");
                    upList_content = all.querySelector(
                        ".bili-dyn-up-list__content"
                    );
                    upList = upList_content.children;
                    all.addEventListener("click", () => {
                        setTabs();
                    });
                }
                for (let item of upList) {
                    let textDiv = item.querySelector(
                        ".bili-dyn-up-list__item__name"
                    );
                    textDiv.remove();
                }
                window.clearInterval(id);
            }
        }, 100);
    }
    //设置左侧的正在直播栏
    {
        let body;
        let id = window.setInterval(() => {
            let live_users = document.querySelector(
                "aside.left div.bili-dyn-live-users"
            );
            let list = [];
            if (live_users) {
                {
                    //删除顶部的“正在直播”
                    live_users
                        .querySelector(".bili-dyn-live-users__header")
                        .remove();
                    body = live_users.querySelector(
                        ".bili-dyn-live-users__body"
                    );
                }
                window.clearInterval(id);
            }
        }, 100);
    }
    //设置发动态的那一栏
    {
        let id = window.setInterval(() => {
            let publishing = document.querySelector("div.bili-dyn-publishing");
            if (publishing) {
                let button = document.createElement("button");
                button.innerText = "我要发动态";
                button.setAttribute("class", "bili-user-button");
                publishing.parentElement.insertBefore(button, publishing);
                //为按钮添加点击事件
                {
                    button.addEventListener("click", () => {
                        if (button.innerText == "我要发动态") {
                            button.style.setProperty("background-color", "red");
                            button.style.setProperty("color", "blue");
                            button.innerHTML = "不想发动态";
                            publishing.style.setProperty(
                                "display",
                                "inline-block"
                            );
                            publishing.style.setProperty("height", "150px");
                        } else {
                            button.style.setProperty(
                                "background-color",
                                "#66ccff"
                            );
                            button.style.setProperty("color", "white");
                            button.innerHTML = "我要发动态";
                            window.setTimeout(() => {
                                publishing.style.setProperty("display", "none");
                            }, 400);
                            publishing.style.setProperty("height", "0px");
                        }
                    });
                }
                window.clearInterval(id);
            }
        }, 100);
    }
    //设置提交评论按钮快捷键ctrl+Enter
    {
        let id = window.setInterval(() => {
            let textareas = document.querySelectorAll("textarea.ipt-txt");
            for (let textarea of textareas) {
                if (textarea) {
                    //为按钮添加ctrl+Enter快捷键
                    if (textarea.getAttribute("data-shortcut") == null) {
                        textarea.setAttribute("data-shortcut", "true");
                    } else continue;
                    let button = textarea.parentElement.querySelector("button");
                    let clickbutton = (e) => {
                        if (e.ctrlKey && e.key == "Enter") {
                            button.click();
                        }
                    };
                    textarea.addEventListener(
                        "keydown",
                        () => {
                            if (textarea.getAttribute("data-keydown") == null) {
                                textarea.setAttribute("data-keydown", "true");
                            } else return;
                            textarea.addEventListener("keydown", clickbutton);
                        },
                        true
                    );
                    textarea.addEventListener("blur", () => {
                        textarea.removeEventListener("keydown", clickbutton);
                        textarea.removeAttribute("data-keydown");
                    });
                }
            }
        }, 100);
    }

    getAndSetBackgroundColor("aside.left div.bili-dyn-live-users");
    //由于tabs点击后会刷新元素，所以需要重新设置背景色
    //由于选择上面的具体UP主的动态会刷新tabs，所以需要重新获取
    getAndSetBackgroundColor(
        "div.bili-dyn-publishing div.bili-rich-textarea__inner"
    );
    // Your code here...
})();
