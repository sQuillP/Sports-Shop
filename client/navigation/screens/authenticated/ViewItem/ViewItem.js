import {View, Modal, ScrollView, StyleSheet, Text, Image, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Ratings from './Ratings';
import Ionicons from '@expo/vector-icons/Ionicons';
import QuantityIncrementor from './QuantityIncrementor';
import ModalContent from './ModalContent';
import { GlobalStyles } from '../../../../globals/styles';
import { useDispatch } from 'react-redux';
import { addToBag } from '../../../../redux/slice/bagSlice';
const colorCodes = [
    "salmon", //red
    "#FFD580", //orange,
    "gold", //yellow,
    "lime",//green
    "lightblue",//blue,
    "blue"
];

const sizes = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "xxl"
];


export default function ViewItem() {

    const {item} = useRoute().params;
    const navigation = useNavigation();
    const [quantity, updateQuantity] = useState(1);
    const [pickedColor, updatePickedColor] = useState(colorCodes[0]);
    const [pickedSize, updatePickedSize] = useState(sizes[0]);
    const [showModal, updateShowModal] = useState(false);
    const dispatch = useDispatch();


    useEffect(()=> {
        navigation.setOptions({title: item.name});
    },[item]);

    function onSelectColor(color) {

        return ()=> updatePickedColor(color);
    }

    function onSelectSize(size) {
        return ()=> updatePickedSize(size);
    }

    function onAddToBag() {
        updateQuantity(1);
        updateShowModal(true);
        // dispatch(addToBag(item));
        //dispatch redux and add to bag with product information
        
    }


    function onFavorite() {
        //use firebase to add product to favorites
    }

    function onCloseModal() {
        updateShowModal(false);
    }

    return (
        <ScrollView style={styles.container}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    updateShowModal(false);
                }}
            >
                <ModalContent closeModal={onCloseModal}/>
            </Modal>

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
            <View style={[styles.headerWrapper, {alignItems:'center'}]}>
                <TouchableOpacity style={[styles.btn,styles.addBag, {marginBottom: 10}]} onPress={onAddToBag}>
                    <Text style={{color:"white", textAlign:'center', fontSize: 20}}>Add to bag</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.favorite]} onPress={onFavorite}>
                    <Text style={{color:GlobalStyles.primaryBlack, marginRight: 5, fontSize:20}}>Favorite</Text>
                    <Ionicons name='heart-outline' size={25} color={GlobalStyles.primaryBlack}/>
                </TouchableOpacity>
            </View>
            <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Available Colors</Text>
                <View style={styles.colorContainer}>
                    {
                        colorCodes.map((color)=> (
                            <Pressable 
                                onPress={onSelectColor(color)} 
                                key={color} 
                                style={[styles.colorView,{backgroundColor:color}]}
                            >
                                {pickedColor === color && <View style={styles.selectedColor}></View>}
                            </Pressable>
                        ))
                    }
                </View>
            </View>
            <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Select Size</Text>
                <View style={styles.sizeWrapper}>
                    {
                        sizes.map(size => (
                            <Pressable onPress={onSelectSize(size)} key={size} style={[styles.sizeItem, {backgroundColor: pickedSize === size?GlobalStyles.primaryBlack:'white'}]}>
                                <Text style={[styles.sizeText, {color:pickedSize === size?'white':GlobalStyles.primaryBlack}]}>{size.toUpperCase()}</Text>
                            </Pressable>
                        ))
                    }
                </View>
            </View>
            <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Description</Text>
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
    },
    colorContainer: {
        flexDirection:'row',
        paddingLeft: 15,
        position:'relative',
    },
    colorView: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
        marginHorizontal: 5,
        borderWidth: 1
    },
    selectedColor: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        backgroundColor:GlobalStyles.primaryBlack,
        position:'absolute',
        top: 0,
        right: -5,
        borderColor:'white',
        borderWidth:1
    },
    btn: {
        paddingVertical: 15,
        borderRadius: 20,
        width: '90%',
        borderWidth: 1,
        borderColor:GlobalStyles.primaryBlack, 

    },
    favorite: { 
        flexDirection: 'row', 
        justifyContent:'center',
        backgroundColor:'white',
        alignItems:'center',
    },
    addBag: {
        backgroundColor:GlobalStyles.primaryBlack
        
    },
    sizeWrapper: {
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft:20,

    },
    sizeItem: {
        padding: 5,
        borderColor:GlobalStyles.primaryBlack,
        borderWidth: 1,
        width: 47,
        height:47,
        justifyContent:'center',
        alignItems:'center',
        margin: 5,
        borderRadius: 5
    },
    sizeText: {
        fontWeight:'bold'
    }
});