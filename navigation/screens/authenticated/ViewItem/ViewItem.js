import {View, ScrollView, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Ratings from './Ratings';

import QuantityIncrementor from './QuantityIncrementor';

export default function ViewItem() {

    const {item} = useRoute().params;
    const navigation = useNavigation();
    const [quantity, updateQuantity] = useState(1);

    useEffect(()=> {
        navigation.setOptions({title: item.name});
    },[item]);

    console.log(item);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.gallery}>
                <Image
                    source={{uri: item.uri}}
                    resizeMode="contain"
                    style={styles.mainImage}
                />
            </View>
            <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>{item.name}</Text>
            </View>
            <View style={styles.headerWrapper}>
                <View style={styles.purchaseDetails}>
                    <View>
                        <Text style={styles.purchaseDescriptor}>Price</Text>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                    <View>
                        <Text style={styles.purchaseDescriptor}>Quantity</Text>
                        <QuantityIncrementor
                            increment={updateQuantity}
                            value={quantity}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Product Description</Text>
                <Text style={styles.itemText}>Nostrud commodo nulla sunt enim veniam. Minim in sit anim anim occaecat amet qui occaecat duis. Lorem labore ipsum et nostrud magna voluptate quis consectetur commodo enim. Ipsum cillum elit enim sint minim.</Text>
            </View>
            <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Ratings & Reviews</Text>
                <Ratings/>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'white'
    },
    gallery: {
    },
    headerWrapper: {
        paddingVertical: 15,
        borderColor: '#eee',
        borderBottomWidth: 2
    },
    itemHeader: {
        fontSize:25,
        fontWeight:'bold',
        marginLeft: 20,
        marginBottom: 10
    },
    mainImage: {
        height: Dimensions.get('window').height*0.60,
        width:'100%',
        
    },
    purchaseDetails:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    purchaseDescriptor: {
        textAlign:'center',
        marginBottom: 7,
        fontSize: 17
    },
    price: {
        fontSize: 25,
        fontWeight:'bold'
    },
    itemText: {
        marginTop: 10,
        marginLeft: 20,
        fontSize: 17
    }

})