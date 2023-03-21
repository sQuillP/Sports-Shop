import { StyleSheet, Text, FlatList, ScrollView, View,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios'
import ItemCard from "../../../../components/ItemCard";
import Panel from "./Panel";
import { useEffect, useState } from "react";

export default function Home() {

    const [clothingDisplay, setClothingDisplay] = useState([]);
    const [shoeDisplay, setShoeDisplay] = useState([]);
    const [gearDisplay, setGearDisplay] = useState([]);


    async function getItemsDisplay() {
        const URL = 'http://10.0.2.2:3000/items';
        const params = {params:{limit:5}};
        const shoes = axios.get(`${URL}/shoes`,params);
        const clothing = axios.get(`${URL}/clothing`,params);
        const equipment = axios.get(`${URL}/equipment`, params);
        try{
            let mappedResults = (await Promise.all([shoes,clothing,equipment])).map(result => result.data.data);
            return mappedResults;
        } catch(error) {
            console.log(error.message)
            return [[],[],[]];
        }
    }


    useEffect(()=> {
        let mounted = true;
        (async ()=>{
            console.log('getting items')
            let [shoes, clothing, gear] = await getItemsDisplay();
            if(mounted) {
                setShoeDisplay(shoes);
                setClothingDisplay(clothing);
                setGearDisplay(gear)
            }
        })();
        return ()=> mounted = false;
    },[setShoeDisplay, setClothingDisplay, setGearDisplay]);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.greetingWrapper}>
                    <Text style={styles.greeting}>Good afternoon, William</Text>
                </View>
                <View style={styles.productSection}>
                    <Text style={styles.textIntro}>Products you may like</Text>
                    <FlatList
                        data={shoeDisplay}
                        horizontal={true}
                        keyExtractor={(item)=> item._id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=> {
                            return (
                                <ItemCard
                                    uri={item.image}
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
                    <Text style={styles.textIntro}>Shop Clothing</Text>
                    <FlatList
                        data={clothingDisplay}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item)=> item._id}
                        renderItem={({item})=> {
                            return (
                                <ItemCard
                                    uri={item.image}
                                    name={item.name}
                                    price={item.price}
                                />
                            );
                        }}
                    />
                </View>
                <View style={styles.productSection}>
                    <Text style={styles.textIntro}>Browse Gear</Text>
                    <FlatList
                        keyExtractor={(item)=> item._id}
                        data={gearDisplay}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=> {
                            return (
                                <ItemCard
                                    uri={item.image}
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