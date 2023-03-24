import { ScrollView, View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../../../globals/styles";
import BagItem from "./BagItem";
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import Checkout from "../checkout/Checkout";
import { useState, useEffect } from "react";
import formatSize from "../../../../util/formatSize";


export default function Bag() {

    const {items} = useSelector((store)=> store.bag);
    const navigator = useNavigation();
    const [totalCost, updateTotalCost] = useState(0);
    const { user }  = useSelector((store)=> store.auth);
    useEffect(()=> {
        const totalCost = items.reduce((priceSum, curItem)=> priceSum + (curItem.price * curItem.quantity), 0.0);
        updateTotalCost(totalCost.toFixed(2));
    },[items]);


    function onCheckout() {
        navigator.navigate('Checkout');
    }

    function onNavigate(){
        navigator.navigate('Shop')
    }

    return (
        <View style={styles.container}>
            {
                (!!items.length)?(
                    <>
                        <View style={styles.cart}>
                        <FlatList
                            data={items}
                            renderItem={({item})=>{
                                return <BagItem item={item}/>
                            }}
                            keyExtractor={(item)=>{
                                return `${user.uid}/${item._id}_${item.pickedColor}_${formatSize(item.pickedSize)}`
                                
                            }}
                        /> 
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.checkoutTitle}>
                                <Text style={styles.footerTitle}>Total Amount</Text>
                                <Text style={styles.footerTitle}>${totalCost}</Text>
                            </View>
                        <Checkout paymentAmount={totalCost}/>
                        </View>
                    </>
                ):
                (!items.length)&&(
                    <View style={styles.noCart}>
                        <Text style={styles.noCartHeader}>No Items in cart</Text>
                        <FontAwesome5 style={{marginVertical: 20}} name="sad-cry" size={30} color="gray" />
                        <Text style={styles.noCartDescription}>Tap to start shopping!</Text>
                        <TouchableOpacity onPress={onNavigate} style={styles.btn}>
                            <Text style={styles.btnText}>Shop Now</Text>
                            <AntDesign name="right" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                ) 
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    footer: {
        flex: 1,
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'white',
        borderTopColor:'lightgray',
        borderTopWidth:1
    },
    cart: {
        flex: 3
    },
    checkout: {
        paddingVertical: 15,
        backgroundColor:GlobalStyles.primaryBlack,
        borderRadius: 20,
        width: '75%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    btn: {
        borderRadius: 15,
        backgroundColor:GlobalStyles.primaryBlack,
        paddingVertical:10,
        width: '50%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText: {
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        marginRight: 10
    },
    checkoutTitle: {
        flexDirection:'row',
        justifyContent:'space-around',
        width: '100%'
    },
    footerTitle: {
        fontSize: 25
    },
    noCart: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    noCartHeader: {
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:'gray'
    },
    noCartDescription: {
        marginVertical:15,
        textAlign:'center',
        fontSize:20
    }
});