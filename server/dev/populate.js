const mongoose = require('mongoose');
const connectDB = require("../db/dbConnect");
const Item = require("../schema/StoreItem");
const seed = require("./shoeData");
const scrape = require('./scraper');

const GOLF_LINK = 'https://www.nike.com/w/baseball-accessories-equipment-99fchzawwpw';
const SHOE_LINK = 'https://www.nike.com/w/unisex-shoes-3rauvzy7ok';
const CLOTHING_LINK = 'https://www.nike.com/w/unisex-running-clothing-37v7jz3rauvz6ymx6';


async function seedData() {

    await connectDB();

    console.log('Scraping has started')
    console.log('scraping shoes');
    const shoesList = await scrape(SHOE_LINK,"shoes");
    console.log('scraping equipment');
    const gearList = await scrape(GOLF_LINK,"equipment");
    console.log('scraping clothing');
    const clothingList = await scrape(CLOTHING_LINK,"clothing");

    try {
        await Item.insertMany(shoesList);    
        await Item.insertMany(gearList);
        await Item.insertMany(clothingList);
        console.log('Data successfully inserted!');
        process.exit(1);

    } catch(error) {
        console.log('Unable to insert store data ',error.message);
        process.exit(1);
    }


}

seedData();


module.exports = seedData;