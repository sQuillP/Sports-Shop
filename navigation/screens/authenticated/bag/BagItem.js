import { StyleSheet, View, Image , Text, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import BagIncrementor from "./BagIncrementor";
import { useDispatch } from "react-redux";

function formatText(text, len) {
    if(text.length < len){
        return text.substring(0, len) + "...";
    }
    return text;
}

export default function BagItem({uri, name,  description="This is the description of the item", price, quantity}) {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [itemQuantity, updateQuantity] = useState(quantity);

    console.log(uri);
    function onNavigate() {
        //this might be changed like using an id instead.
        navigation.navigate('ViewItem',{item: {uri,description,price}});

    }

    return (
        <Pressable onPress={onNavigate} style={styles.container}>
            <View style={styles.itemTop}>
                <Image source={{uri}} resizeMode="cover" style={styles.image}/>
                <View style={styles.itemContent}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.info}>{formatText(description)}</Text>
                    <Text style={styles.info}>Size 9</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.info}>Color:  </Text>
                        <View style={[styles.color, {backgroundColor: 'green'}]}></View>
                    </View>
                </View>
            </View>
            <View style={styles.itemBottom}>
                <BagIncrementor
                    quantity={itemQuantity}
                    updateQuantity={updateQuantity}
                />
                <Text style={styles.price}>$123</Text>
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