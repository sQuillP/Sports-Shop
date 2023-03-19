const puppeteer = require('puppeteer');
const Item = require("../schema/StoreItem");

const SCRAPE_URL = 'https://www.nike.com/w/unisex-shoes-3rauvzy7ok';
const cardSelector = '.product-card__link-overlay';


(async ()=> {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(SCRAPE_URL,{waitUntil:'domcontentloaded'});
    const scrapedData = [];
    //scrape the sub link
    async function scrapeLink(link) {
        console.log('scraping link...')
        const nameSelector = '#pdp_product_title';
        const descriptionSelector = '.description-preview.body-2.css-1pbvugb > p';
        await page.goto(link,{waitUntil:'domcontentloaded'});
        const name = await page.$eval(nameSelector,(el)=> el.textContent);
        console.log(name);
        const description = await page.$eval(descriptionSelector,(el)=> el.textContent);
        console.log(description);
        return {
            name,
            description
        };
    }

    const imageSelector = '.product-card__hero-image';
    const priceSelector = '.is--current-price';

    console.log('grabbing images')
    //grab all images
    await page.waitForSelector(imageSelector);
    const imageList = await page.$$eval(imageSelector,(images)=>(
        Array.from(images).map(image=> image.getAttribute('src'))
    ));

    console.log('getting prices');
    //grab all prices
    await page.waitForSelector(priceSelector);
    const priceList = await page.$$eval(priceSelector,(prices)=>(
        Array.from(prices).map(price => price.textContent)
    ));


    console.log('navigating to links')
    //get links from all images
    await page.waitForSelector(cardSelector);
    const links = await page.$$eval(cardSelector,(cards)=>(
        cards.map((card)=>card.getAttribute('href'))
    ));

    console.log('putting everything together...')
    console.log(links.length, imageList.length, priceList.length);
    for(let i = 0; i<links.length; i++){
        const storeItem = {
            image: imageList[i],
            price:priceList[i],
        };
        const {name, description} =  await scrapeLink(links[i], storeItem);
        storeItem['name'] = name;
        storeItem['description'] = description;
        scrapedData.push(storeItem);
    }

    console.log(scrapedData);
 
    await browser.close();
})();