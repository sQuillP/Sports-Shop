import { FlatList, View, StyleSheet, Text, Pressable, TouchableOpacity, Dimensions, Alert } from "react-native";
import ItemCard from "../../../../components/ItemCard";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../../globals/styles";
import { Feather } from '@expo/vector-icons'; 
import { db } from "../../../../firebase/firebase.config";
import { ref, set } from 'firebase/database';

const minCols = 2;


const calcNumColumns = (width) => {
    const cols = width / 125
    const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
    const colsMinusMargin = cols - (2 * colsFloor * 5);
    if (colsMinusMargin < colsFloor && colsFloor > minCols) {
      return colsFloor - 1;
    } else return colsFloor;
};


export default function Favorites(){



    const favoritedItems = useSelector((store)=> store.favorites.items);
    const { user } = useSelector((store)=> store.auth);

    const { width } = Dimensions.get('window');
    const navigation = useNavigation();
    console.log('in favorites',favoritedItems)

    function onNavigate() {
        navigation.navigate('Shop');
    }


    function onToggleAlertRemove(_id){
        return ()=> {
            Alert.alert("Remove from favorites?","You will no longer see this item in your favorites tab.",[{
                text:'Ok',
                onPress:async ()=> {
                    const itemRef = ref(db,`favorites/${user.uid}/${_id}`);
                    try{
                        //remove item from rtdb
                        await set(itemRef,null);
                    } catch(error) {
                        Alert.alert("Network error","Unable to remove item from favorites");
                        console.log(error.message);
                    }
                },
                style:'default'
            }, {
                text:'Cancel',
                style:'cancel'
            }]);
        }
    }


    return (
        <View style={styles.container}>
            {
                !favoritedItems.length?(
                    <View style={styles.noItems}>
                        <Text style={styles.noItemsText}>No Favorited Items</Text>
                        <Text style={styles.noItemsSmallText}>Your favorited items will appear here. Tap to start shopping.</Text>
                        <TouchableOpacity style={styles.btn} onPress={onNavigate}>
                            <Text style={styles.btnText}>Start Shopping</Text>
                        </TouchableOpacity>
                    </View>
                ):(
                    <FlatList
                        columnWrapperStyle={{justifyContent:'space-around'}}
                        data={favoritedItems}
                        keyExtractor={(item)=> item._id}
                        numColumns={calcNumColumns(width)}
                        renderItem={({item})=> {
                            return (
                                <View style={styles.itemCardOverlay}>
                                    <Pressable style={styles.removeBtn} onPress={onToggleAlertRemove(item._id)}>
                                        <Feather name="x" size={20} color="gray" />
                                    </Pressable>
                                    <ItemCard
                                        item={item}
                                    />
                                </View>
                            )
                        }}
                    />
                )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    noItems: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    noItemsText: {
        color:'lightgray',
        fontWeight:'bold',
        fontSize: 30,
        textAlign:'center'
    },
    noItemsSmallText:{
        fontSize:15,
        color:'gray',
        textAlign:'center',
        marginVertical:15
        
    },
    btnText: {
        textAlign:'center',
        fontWeight:'bold',
        color:'white',
    },
    btn: {
        paddingVertical:10,
        borderRadius: 10,
        width:'50%',
        backgroundColor:GlobalStyles.primaryBlack
    },
    itemCardOverlay: {
        position:'relative',
        backgroundColor:'white'
    },
    removeBtn: {
        position:'absolute',
        right: 5,
        top: 5,
        zIndex:1
    }
});