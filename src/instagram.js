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
  })();