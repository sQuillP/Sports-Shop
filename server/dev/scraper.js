const puppeteer = require('puppeteer');


const shoeSizes = ["6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11"];
const clothingSizes = ["XS","SM","MD","LG","XL","XXL"];
const availableColors = ['white',"red","salmon","orange","gold","green","lightblue","purple"];

/* Scrape any url page that displays items */
async function scrape(SCRAPE_URL, CATEGORY){

    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(SCRAPE_URL,{waitUntil:['domcontentloaded']});
    const scrapedData = [];
    //scrape the sub link
    async function scrapeLink(link) {
        console.log('scraping link...')
        const nameSelector = '#pdp_product_title';
        const descriptionSelector = '.description-preview.body-2.css-1pbvugb > p';
        await page.goto(link,{waitUntil:'domcontentloaded'});
        const name = await page.$eval(nameSelector,(el)=> el.textContent);
        const description = await page.$eval(descriptionSelector,(el)=> el.textContent);
        return {
            name,
            description
        };
    }

    const imageSelector = '.product-card__hero-image';
    const priceSelector = '.is--current-price';
    const cardSelector = '.product-card__link-overlay';

    //grab all images
    await page.waitForSelector(imageSelector);
    const imageList = await page.$$eval(imageSelector,(images)=>(
        images.map(image=> image.getAttribute('src'))
    ));

    //grab all prices
    await page.waitForSelector(priceSelector);
    const priceList = await page.$$eval(priceSelector,(prices)=>(
        prices.map(price => price.textContent)
    ));


    //get links from all images
    await page.waitForSelector(cardSelector);
    const links = await page.$$eval(cardSelector,(cards)=>(
        cards.map((card)=>card.getAttribute('href'))
    ));

    console.log(links.length, imageList.length, priceList.length);
    for(let i = 0; i<links.length; i++){
        try {
            const linkData =  await scrapeLink(links[i]);
            const storeItem = {
                ...linkData,
                sizes: CATEGORY==='shoes'?shoeSizes:clothingSizes,
                image: imageList[i],
                price:Number(priceList[i].substring(1)),
                ratings:{
                    "1": Math.floor(Math.random()*5),
                    "2": Math.floor(Math.random()*10),
                    "3": Math.floor(Math.random()*20),
                    "4":Math.floor(Math.random()*40),
                    "5":Math.floor(Math.random()*80)
                },
                inventoryCount: Math.floor(Math.random()*100) + 10,
                colors: availableColors,
                category:CATEGORY
            };
            scrapedData.push(storeItem);
            console.log(i+1);
        } catch(error) {
            console.log(error.message);
            process.exit(1);
        }
    }
    await browser.close();
    return scrapedData;
};


module.exports = scrape;