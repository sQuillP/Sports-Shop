const mongoose = require('mongoose');
const connectDB = require("../db/dbConnect");
const Item = require("../schema/StoreItem");
const seed = require("./dummyData");


async function seedData() {

    await connectDB();

    const item = new Item(seed[0]);

    console.log(seed)
    await item.save();

    console.log('item successfully saved');

}

seedData();


module.exports = seedData;