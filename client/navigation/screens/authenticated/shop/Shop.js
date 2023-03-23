import { useEffect, useState } from 'react';
import {Dimensions, ActivityIndicator, FlatList, Keyboard, ScrollView, StyleSheet, Text,TouchableWithoutFeedback,View} from 'react-native'
import { useSelector } from 'react-redux';
import ItemCard from '../../../../components/ItemCard';
import axios from 'axios';
import { GlobalStyles } from '../../../../globals/styles';

const minCols = 2;

const calcNumColumns = (width) => {
    const cols = width / 125
    const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
    const colsMinusMargin = cols - (2 * colsFloor * 5);
    if (colsMinusMargin < colsFloor && colsFloor > minCols) {
      return colsFloor - 1;
    } else return colsFloor;
};

export default function Shop() {

    const { category, fetchingResults, items } = useSelector((store)=> store.category);
    const {width} = Dimensions.get('window');
    const [itemData, updateItemData] = useState([]);
    useEffect(()=> {
        updateItemData(items)
    }, [items]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
            {
                (fetchingResults)&&(
                    <View style={styles.loader}>
                        <ActivityIndicator size={'large'} color={GlobalStyles.primaryBlack}/>
                        <Text>Fetching...</Text>
                    </View>
                )
            }
            {
                (!fetchingResults && !!itemData.length) &&(
                    <FlatList
                        columnWrapperStyle={{justifyContent:'space-around'}}
                        data={items}
                        numColumns={calcNumColumns(width)}
                        keyExtractor={(item)=> item._id}
                        renderItem={({item})=> {
                            return (
                                <ItemCard
                                    item={item}
                                />
                            );
                        }}
                    />
                )
            }
            {
                (!fetchingResults && !itemData.length) && (
                    <View style={styles.noItems}>
                        <Text style={styles.errorTitle}>Network error</Text>
                        <Text style={styles.errorDescription}>Unable to connect to server</Text>
                    </View>
                )
            }

            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    loader: {
        justifyContent:'center',
        alignItems:'center',
        flex: 1
    },
    greetingWrapper: {

    },
    greeting: {

    },
    noItems:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    errorTitle: {
        textAlign:'center',
        fontSize: 30,
        color:'lightgray',
        fontWeight:'bold',
    },
    errorDescription: {
        textAlign:'center',
        color:'gray',
        marginVertical:15,
        
    }
});