import { StyleSheet, Text, FlatList, ScrollView, View,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ItemCard from "../../../../components/ItemCard";
import Panel from "./Panel";

const itemData = [
    {name:"Nike Air Jordan 1 Mid", price: 125, uri:'https://static.nike.com/a/images/t_PDP_1728_v1/0e7fc8f3-76b7-4631-b147-4dad4b1ff241/air-jordan-1-mid-shoes-X5pM09.png', id:1},
    {name:"Nike Air Jordan 1 Mid", price: 125, uri:'https://static.nike.com/a/images/t_PDP_1728_v1/0e7fc8f3-76b7-4631-b147-4dad4b1ff241/air-jordan-1-mid-shoes-X5pM09.png', id:2},
    {name:"Nike Air Jordan 1 Mid", price: 125, uri:'https://static.nike.com/a/images/t_PDP_1728_v1/0e7fc8f3-76b7-4631-b147-4dad4b1ff241/air-jordan-1-mid-shoes-X5pM09.png', id:3},
    {name:"Nike Air Jordan 1 Mid", price: 125, uri:'https://static.nike.com/a/images/t_PDP_1728_v1/0e7fc8f3-76b7-4631-b147-4dad4b1ff241/air-jordan-1-mid-shoes-X5pM09.png', id:4},
];

const itemData2 = [
    {name:'Plain White T Jersy', price: 55, uri: 'https://static.fibre2fashion.com/MemberResources/LeadResources/1/2018/4/Seller/18146349/Images/18146349_0_plain-sports-t-shirts-for-men.png', id:1},
    {name:'Plain White T Jersy', price: 55, uri: 'https://static.fibre2fashion.com/MemberResources/LeadResources/1/2018/4/Seller/18146349/Images/18146349_0_plain-sports-t-shirts-for-men.png', id:2},
    {name:'Plain White T Jersy', price: 55, uri: 'https://static.fibre2fashion.com/MemberResources/LeadResources/1/2018/4/Seller/18146349/Images/18146349_0_plain-sports-t-shirts-for-men.png', id:3},
    {name:'Plain White T Jersy', price: 55, uri: 'https://static.fibre2fashion.com/MemberResources/LeadResources/1/2018/4/Seller/18146349/Images/18146349_0_plain-sports-t-shirts-for-men.png', id:4},
];

const itemData3 = [
    {name:'Phantom Black Hoodie', price: 60, uri:'https://cdn.shopify.com/s/files/1/0323/1157/products/3HS_BX_02_637511360835387086.jpg?v=1626164103', id:1},
    {name:'Phantom Black Hoodie', price: 60, uri:'https://cdn.shopify.com/s/files/1/0323/1157/products/3HS_BX_02_637511360835387086.jpg?v=1626164103', id:2},
    {name:'Phantom Black Hoodie', price: 60, uri:'https://cdn.shopify.com/s/files/1/0323/1157/products/3HS_BX_02_637511360835387086.jpg?v=1626164103', id:3},
    {name:'Phantom Black Hoodie', price: 60, uri:'https://cdn.shopify.com/s/files/1/0323/1157/products/3HS_BX_02_637511360835387086.jpg?v=1626164103', id:4},
]


export default function Home() {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.greetingWrapper}>
                    <Text style={styles.greeting}>Good afternoon, William</Text>
                </View>
                <View style={styles.productSection}>
                    <Text style={styles.textIntro}>Products you may like</Text>
                    <FlatList
                        data={itemData}
                        horizontal={true}
                        keyExtractor={(item)=> item.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=> {
                            return (
                                <ItemCard
                                    uri={item.uri}
                                    name={item.name}
                                    price={item.price}
                                />
                            );
                        }}
                    />
                </View>
                <Text style={styles.textIntro}>Now Featuring</Text>
                <Panel
                    navigate={"Home"}
                    headerText={"Clothing"}
                    description={"Find greatest sportswear for the four seasons."}
                    image={"https://mindbodygreen-res.cloudinary.com/image/upload/c_fill,w_2000,h_1200,g_auto,fl_lossy,f_jpg/org/6dqll4qsblbcjmce6.jpg"}
                />
                <Panel
                    navigate={"Home"}
                    headerText={"Shoes"}
                    description={"Get the latest and greatest shoes we have to offer"}
                    image={"https://media.gq.com/photos/5a25869add2c1d7f1b5b5e45/16:9/w_2560%2Cc_limit/gq-nike.jpg"}
                />
                <Panel
                    navigate={"Home"}
                    headerText={"Sports Wear"}
                    description={"Duable sports wear for professional and ameteurs alike"}
                    image={"https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_593,c_limit/800dd287-7255-423c-b2ed-72e220ca5c48/nike-just-do-it.jpg"}
                />
                <View style={styles.productSection}>
                    <Text style={styles.textIntro}>Shop Hoodies</Text>
                    <FlatList
                        data={itemData2}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item)=> item.id}
                        renderItem={({item})=> {
                            return (
                                <ItemCard
                                    uri={item.uri}
                                    name={item.name}
                                    price={item.price}
                                />
                            );
                        }}
                    />
                </View>
                <View style={styles.productSection}>
                    <Text style={styles.textIntro}>Browse T Shirts</Text>
                    <FlatList
                        keyExtractor={(item)=> item.id}
                        data={itemData3}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=> {
                            return (
                                <ItemCard
                                    uri={item.uri}
                                    name={item.name}
                                    price={item.price}
                                />
                            );
                        }}
                    />
                </View>
                <View style={styles.thanks}>
                    <Image 
                        source={require("../../../../assets/nike-logo.webp")}
                        style={{width: 120, height: 120}}
                        resizeMode={'contain'}
                    />
                    <Text style={styles.thanksText}>Thank you for shopping with us.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    greetingWrapper: {
        paddingVertical: 20,

    },
    productSection: {
        marginBottom: 15
    },
    greeting: {
        textAlign:'center',
        fontSize: 25
    },
    textIntro: {
        marginLeft: 20,
        fontSize:20,
        marginVertical: 10,
        fontWeight:'bold'
    },
    thanks: {
        marginBottom: 30,
        alignItems:'center'
    },
    thanksText: {
        fontSize:15,
        textAlign:'center',
        fontWeight:'bold'
    }
});