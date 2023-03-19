

const shoeSizes = ["6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11"];
const clothingSizes = ["XS","SM","MD","LG","XL","XXL"];
const availableColors = ['white',"red","salmon","orange","gold","green","lightblue","purple"];


function getVariety(){
    return {
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
}

const shoeData = [
    {
        name:"Nike Dunk High Retro",
        description:"Recognizing the Dunk's roots as the top-ranking college team sneaker, the \"Be True To Your School\" pack looks to the original ad campaign for inspiration. Colors represent top-flight universities, while design details serve throwback hoops flair. And that crisp leather has the perfect amount of sheen to make 'em a hands-down win. So lace up and show off that varsity spirit with color combos that nod to your fave team. Ya game?",
        price: 125,
        image:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8e5c2b2d-ffed-4874-a843-338faf37b8e3/dunk-high-retro-mens-shoes-dTVTCk.png",
        ...getVariety()
    },
    {
        name:"Air Jordan 1 Mid SE",
        description: "Get that Jordan energy on your feet this holiday season. Rich grain leather with bright details make this pair shine like holiday lights.",
        price: 125,
        image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f2b31c3-e0d4-4895-b505-37782acd639d/air-jordan-1-mid-se-mens-shoes-Zn07hL.png",
        ...getVariety()
    },
    {
        name:"Luka 1",
        description:"Designed for #77 and made for every athlete craving speed and efficiency, Luka's debut delivers the goods. The first shoe with full-length Formula 23 foam, it has an ultra-supportive fit crafted with the step-back in mind. Meanwhile, strong and lightweight Flight Wire cables keep you feeling contained, whether you're playing indoors or out. This is the assist you've been waiting for—get out there and make your shot.",
        price: 110,
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/65dbe06e-a74a-41d3-bd08-8fde5503dd31/luka-1-basketball-shoes-69X9Vs.png",
        ...getVariety()
    },
    {
        name:'Nike Air Max 97',
        description:'Push your style full speed ahead with the Nike Air Max 97. Inspired by the streamlined look of bullet trains, these kicks feature full-length Nike Air units for first-class comfort. Soft neutrals elevate the timeless ripple design to create a truly classic look.',
        image:'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6a5b821d-ff38-43ae-ab0d-50e523bae16d/air-max-97-mens-shoes-LJmK45.png',
        price: 175,
        ...getVariety()
    },
    {
        name:"Nike Air Zoom G.T Cut 2",
        description:'The Nike Air Zoom G.T. Cut 2 helps you stop on a dime and accelerate back into the open lane in a low-to-the-ground design that helps increase court contact while switching direction. Separate the players from the playmakers in a model that’s built on creating separation but supportive enough to help you play all day.',
        price: 170,
        image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c090c62f-a2d1-4ae6-8e84-f454d6e93b46/air-zoom-gt-cut-2-basketball-shoes-tmfmFl.png',
        ...getVariety(),
    },
    {
        name:"Nike Go FlyEase",
        description:"Ditch the laces and get outside. These kicks feature Nike's revolutionary FlyEase technology, making on-and-off a breeze. With a heel that pivots open for a totally hands-free entry, they're great for people with limited mobility—or anyone who wants a quicker way to get going.",
        price: 125,
        image:'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/247616b5-1d3b-4777-abbb-d5e08a924b78/go-flyease-easy-on-off-shoes-LGmqKx.png',
        ...getVariety()
    },
    {
        name:"Nike College Pegasus 39 (Florida)",
        price: 140,
        image:'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e47b68e9-e0d1-4267-b0b8-f3caf3f61e66/pegasus-39-florida-mens-road-running-shoes-hRnzP7.png',
        description:'Running is your daily ritual, with every step taking you closer to your personal goal. Let the Nike College Pegasus 39 (Florida) help you ascend to new heights with its comfortable, intuitive design. Providing a supportive sensation, it helps keep your foot contained, while underfoot cushioning combines with 2 Zoom Air units to add a pop to your stride. Your trusted workhorse with wings is back—time to fly.',
        ...getVariety()
    },
    {
        name:"NikeCourt Zoom Vapor Cage 4 Rafa",
        price: 150,
        image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/88d188cf-b8ce-4288-a49b-2bc4d174eb3c/nikecourt-zoom-vapor-cage-4-rafa-mens-hard-court-tennis-shoes-dMxMqL.png',
        description:"Innovated to withstand your toughest matches, this updated design puts flexible, durable materials exactly where they're needed most. Signature Rafael Nadal details let you rep your favorite player while you run the court.",
        ...getVariety()
    }
];

module.exports = shoeData;