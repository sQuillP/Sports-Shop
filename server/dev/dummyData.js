

const shoeSizes = ["6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11"];
const clothingSizes = ["XS","SM","MD","LG","XL","XXL"];
const availableColors = ['white',"red","salmon","orange","gold","green","lightblue","purple"];
const dummyData = [
    {
        name:"Nike Dunk High Retro",
        description:"Recognizing the Dunk's roots as the top-ranking college team sneaker, the \"Be True To Your School\" pack looks to the original ad campaign for inspiration. Colors represent top-flight universities, while design details serve throwback hoops flair. And that crisp leather has the perfect amount of sheen to make 'em a hands-down win. So lace up and show off that varsity spirit with color combos that nod to your fave team. Ya game?",
        price: 125,
        image:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8e5c2b2d-ffed-4874-a843-338faf37b8e3/dunk-high-retro-mens-shoes-dTVTCk.png",
        sizes:shoeSizes,
        colors:availableColors,
        inventoryCount:Math.floor(Math.random()*100) + 10,
        ratings:{
            "1": Math.floor(Math.random()*5),
            "2": Math.floor(Math.random()*10),
            "3": Math.floor(Math.random()*20),
            "4":Math.floor(Math.random()*40),
            "5":Math.floor(Math.random()*80)
        },
    }
];

module.exports = dummyData;