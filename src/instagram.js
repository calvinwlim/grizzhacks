const puppeteer = require("puppeteer");
const settings = require('./settings.js');

(async () => {

    //set time delay function
    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }

    // launch the browser
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--start-fullscreen']
    });
  // create a new tab
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com');
    //login process
    await page.waitFor(() => document.querySelectorAll('input').length)
    console.log('inputting username...');
    await page.type("[name=username]", settings.username);
    console.log('inputted username...');
    console.log('inputting password...');
    await page.type("[name=password]", settings.password);
    console.log('inputted password...');
    await page.keyboard.press('Enter');
    console.log('logging in...');
    await delay(3500);
    await page.click('#react-root > section > main > div > div > div > div > button');
    await delay(2000);
    await page.goto('https://www.instagram.com/nature/');
    await delay(2000);
    const links = await page.evaluate(() => 
    // let's just get all links and create an array from the resulting NodeList
     Array.from(document.querySelectorAll("a")).map(anchor => [anchor.href, anchor.textContent])
     );

    // output all the links
    console.log(links);
    mostRecentPost = links[5];
    console.log(mostRecentPost);
    await page.screenshot({
      path: './assets/photo.png',
      clip: {x: 245, y: 417, width: 298, height: 290}
    })
  })