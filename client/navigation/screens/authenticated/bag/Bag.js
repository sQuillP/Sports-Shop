import { ScrollView, View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../../../globals/styles";
import BagItem from "./BagItem";
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import Checkout from "../checkout/Checkout";


const itemData1 = [
    {name:"Nike Air Jordan 1 Mid", quantity:1, price: 125, uri:'https://static.nike.com/a/images/t_PDP_1728_v1/0e7fc8f3-76b7-4631-b147-4dad4b1ff241/air-jordan-1-mid-shoes-X5pM09.png', id:1},
    {name:"Nike Air Jordan 1 Mid", quantity:1, price: 125, uri:'https://static.nike.com/a/images/t_PDP_1728_v1/0e7fc8f3-76b7-4631-b147-4dad4b1ff241/air-jordan-1-mid-shoes-X5pM09.png', id:2},
    {name:"Nike Air Jordan 1 Mid", quantity:1, price: 125, uri:'https://static.nike.com/a/images/t_PDP_1728_v1/0e7fc8f3-76b7-4631-b147-4dad4b1ff241/air-jordan-1-mid-shoes-X5pM09.png', id:3},
    {name:"Nike Air Jordan 1 Mid", quantity:1, price: 125, uri:'https://static.nike.com/a/images/t_PDP_1728_v1/0e7fc8f3-76b7-4631-b147-4dad4b1ff241/air-jordan-1-mid-shoes-X5pM09.png', id:4},
];

export default function Bag() {

    const {items} = useSelector((store)=> store.bag)
    const navigator = useNavigation();


    function onCheckout() {
        navigator.navigate('Checkout');
    }

    return (
        <View style={styles.container}>
            <View style={styles.cart}>
                <FlatList
                    data={itemData1}
                    renderItem={({item})=>{
                        return <BagItem {...item}/>
                    }}
                    keyExtractor={(item)=>{
                        return item.id
                    }}
                />
            </View>
            <View style={styles.footer}>
                <View style={styles.checkoutTitle}>
                    <Text style={styles.footerTitle}>Total Amount</Text>
                    <Text style={styles.footerTitle}>$232</Text>
                </View>
                <Checkout/>
            </View>
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
    }
});