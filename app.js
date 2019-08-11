/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-10 11:19:35
 * @LastEditTime: 2019-08-11 18:03:32
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require('puppeteer'),
    BlinkDiff = require('blink-diff'),
    imgUrl = __dirname + "/blink-diff_img/";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1940, height: 1225, deviceScaleFactor: 2 });
    await page.goto('https://juejin.im/');

    await page.waitFor(1000);

    const ddd = await page.evaluate(() => {
        // #juejin > div.view-container > main > div > div > div.feed.welcome__feed > ul > li:nth-child(1) > div > div > a > div > div > div.info-row.title-row > a

        //列表
        var Lists = document.querySelectorAll('div.feed.welcome__feed > ul .content-box');
        Lists.forEach((element, index, array) => {
            // ele = element.querySelector('div > div > a > div > div');
            // 替换
            element.querySelector(".info-box > .title-row > a.title").innerHTML = "测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容";

            //替换栏目
            if (!element.querySelector(".meta-row > ul > li.item.post")) {
              var li = document.createElement("li");
              li.className = "item post";
              li.setAttribute("data-v-4f8eaae2","");
              par = element.querySelector(".meta-row > ul");
              par.insertBefore(li, par.firstChild);;
            }
            element.querySelector(".meta-row > ul > li.item.post").innerHTML = "测试栏目";

            //替换标签 多个合一
            element.querySelector(".info-box > .meta-row > ul > li.item.tag").innerHTML = "测试标签";

            // //替换作者
            element.querySelector(".info-box > .meta-row > ul > li.item.username > div > a").innerHTML = "测试作者";

            // //替换发布时间
            element.querySelector(".info-box > .meta-row > ul > li:nth-last-child(2)").innerHTML = "999天前";

            // //替换点赞数
            // element.querySelector(".action-row > ul > li.item.like > a > span").innerHTML = "66";
            if (!element.querySelector(".info-box > .action-row > ul > li.item.like > a > span")) {
              var span = document.createElement("span");
              span.className = "count";
              span.setAttribute("data-v-4f8eaae2","");
              element.querySelector(".info-box > .action-row > ul > li.item.like > a").appendChild(span);
            }
            element.querySelector(".info-box > .action-row > ul > li.item.like > a > span").innerText = '66';

            // //替换评论数 div.info-row.action-row > ul > li.item.comment.clickable > a > span
            if (!element.querySelector(".info-box > .action-row > ul > li.item.comment > a > span")) {
              var span = document.createElement("span");
              span.className = "count";
              span.setAttribute("data-v-4f8eaae2","");
              element.querySelector(".info-box > .action-row > ul > li.item.comment > a").appendChild(span);
            }
            element.querySelector(".info-box > .action-row > ul > li.item.comment > a > span").innerText = "9";

            //列表图片
            if (element.querySelectorAll("div.lazy.thumb.thumb.loaded").length==1) {
                element.querySelector("div.lazy.thumb.thumb.loaded").style.background = "#fdedc9";
            } else {
                var loaded=document.createElement("div");
                loaded.className=" lazy thumb thumb loaded";
                loaded.style.background = "#fdedc9";
                loaded.setAttribute("data-v-3f7abfb9","");
                loaded.setAttribute("data-v-42231c34","");
                loaded.setAttribute("data-v-4f8eaae2","");
                element.appendChild(loaded);
            }
        });
    });

    await page.screenshot({ path: imgUrl + 'Screenshots.png', fullPage: true });

    console.log(ddd);


    const diff = new BlinkDiff({
        imageAPath: imgUrl + 'example@1x.png', // 设计图
        imageBPath: imgUrl + 'Screenshots.png',//页面截图
        threshold: 0.02, // 1% threshold
        imageOutputPath: imgUrl + 'Diff.png'//Diff路径
    });

    diff.run(function (error, result) {
        if (error) {
            throw error;
        } else {
            console.log(diff.hasPassed(result.code) ? '通过' : '失败');
            console.log('总像素:' + result.dimension);
            console.log('发现:' + result.differences + ' 差异.');
            console.log('相似率:' + (result.dimension - result.differences) * 1.0 / result.dimension);

        }
    });



    await browser.close();
})();
