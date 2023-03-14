import { useEffect, useState } from 'react';
import {Dimensions, FlatList, Keyboard, ScrollView, StyleSheet, Text,TouchableWithoutFeedback,View} from 'react-native'
import { useSelector } from 'react-redux';
import ItemCard from '../../../../components/ItemCard';

const minCols = 2;

const calcNumColumns = (width) => {
    const cols = width / 125
    const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
    const colsMinusMargin = cols - (2 * colsFloor * 5);
    if (colsMinusMargin < colsFloor && colsFloor > minCols) {
      return colsFloor - 1;
    } else return colsFloor;
};

const itemData1 = [
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
    {name:'Black Nike Sports Bag', price: 150, uri:'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/444549df-046c-44f6-992c-43fd637f0786/brasilia-95-training-duffel-bag-small-41l-nZq8Xx.png', id:1},
    {name:'Black Nike Sports Bag', price: 150, uri:'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/444549df-046c-44f6-992c-43fd637f0786/brasilia-95-training-duffel-bag-small-41l-nZq8Xx.png', id:2},
    {name:'Black Nike Sports Bag', price: 150, uri:'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/444549df-046c-44f6-992c-43fd637f0786/brasilia-95-training-duffel-bag-small-41l-nZq8Xx.png', id:3},
    {name:'Black Nike Sports Bag', price: 150, uri:'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/444549df-046c-44f6-992c-43fd637f0786/brasilia-95-training-duffel-bag-small-41l-nZq8Xx.png', id:4},
];


export default function Shop() {

    const { category } = useSelector((store)=> store.category);
    const {width} = Dimensions.get('window')
    const [itemData, updateItemData] = useState(itemData1);
    
    useEffect(()=> {
        if(category ==='Shoes')
            updateItemData(itemData1);
        if(category ==='Clothing')
            updateItemData(itemData2);
        else if(category === 'Sports Wear')
            updateItemData(itemData3);
    }, [category]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                <FlatList
                    columnWrapperStyle={{justifyContent:'space-around'}}
                    data={itemData}
                    numColumns={calcNumColumns(width)}
                    keyExtractor={(item)=> item.id}
                    renderItem={({item})=> {
                        return (
                            <ItemCard
                                name={item.name}
                                price={item.price}
                                uri={item.uri}
                            />
                        );
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    greetingWrapper: {

    },
    greeting: {

    }
});