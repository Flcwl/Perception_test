/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-10 12:46:25
 * @LastEditTime: 2019-08-10 13:13:26
 * @LastEditors: Please set LastEditors
 */
const puppeteer = require("puppeteer");

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html");
  // await page.click(
  //   "#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img"
  // );

  // await page.waitFor(1000);

  const result = await page.evaluate(() => {
    let title = document.querySelector("h1").innerText;
    let price = document.querySelector(".price_color").innerText;

    console.log(25, title);

    return {
        title,
        price
    };
  });
  console.log(32, result);

  // Scrape
  browser.close();
  return result;
};

scrape().then(value => {
  console.log(value); // Success!
});
