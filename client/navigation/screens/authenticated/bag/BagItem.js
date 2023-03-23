import { StyleSheet, View, Image , Text, Pressable, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import BagIncrementor from "./BagIncrementor";
import { useDispatch, useSelector } from "react-redux";
import { ref, runTransaction } from "firebase/database";
import { db } from "../../../../firebase/firebase.config";
import formatSize from "../../../../util/formatSize";
import {set} from 'firebase/database';


function formatText(text, len) {
    console.log(text.length)
    if(text.length < len){
        return text;
    }
    return text.substring(0, len) + "...";

}

export default function BagItem({item}) {

    const navigation = useNavigation();
    const { user } = useSelector((store)=> store.auth);

    const dispatch = useDispatch();

    const [itemQuantity, updateQuantity] = useState(item.quantity);

    function onNavigate() {
        //this might be changed like using an id instead.
        navigation.navigate('ViewItem',{item});
    }


    function onIncrement(amount) {
        //location format goes id_color_size
        const itemLocation = `/bag/${user.uid}/${item._id}_${item.pickedColor}_${formatSize(item.pickedSize)}`;
        const itemRef = ref(db,itemLocation);
        runTransaction(itemRef,(bagItem)=> {
            if(bagItem) {
                bagItem.quantity += amount;
            }
            return bagItem;
        });
    }

    async function onRemove() {

    }

    async function removeItem() {
        const itemLocation = `/bag/${user.uid}/${item._id}_${item.pickedColor}_${formatSize(item.pickedSize)}`;
        const itemRef = ref(db, itemLocation);
        // console.log(refVal)
        try{
            await set(itemRef,null);
            Alert.alert("Successfully removed item from cart",
            "You can continue shopping for more products");

        } catch(error) {
            Alert.alert("Unable to remove item from cart",
            "There seems to be a network connection issue =(");
            console.log('in BagItem: unable to remove item: ',error.message);
        }
    }

    return (
        <Pressable onPress={onNavigate} style={styles.container}>
            <View style={styles.itemTop}>
                <Image source={{uri:item.image}} resizeMode="cover" style={styles.image}/>
                <View style={styles.itemContent}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.info}>{formatText(item.description,100)}</Text>
                    <Text style={styles.info}>Size 9</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.info}>Color:  </Text>
                        <View style={[styles.color, {backgroundColor: item.pickedColor}]}></View>
                    </View>
                </View>
            </View>
            <View style={styles.itemBottom}>
                <BagIncrementor
                    quantity={item.quantity}
                    updateQuantity={onIncrement}
                />
                <Pressable onPress={removeItem}>
                    <Text>Remove</Text>
                </Pressable>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor:'lightgray',
    },
    itemTop: {
        flexDirection:'row'
    },
    title: {
        fontWeight:'bold',
        fontSize: 18,
    },
    image: {
        height: 100,
        width: 125
    },
    itemContent: {
        paddingLeft: 10
    },
    info:{
        color:'gray'
    },
    itemBottom: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
    },
    price: {
        fontWeight:'bold',
        fontSize:18,
        marginRight: 10
    },
    color:{
        height: 20,
        width:20, 
        borderRadius: 10,
        borderColor:'black',
        borderWidth: 1
    }
});