import { FlatList, View, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import ItemCard from "../../../../components/ItemCard";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../../globals/styles";

export default function Favorites(){



    const favoritedItems = useSelector((store)=> store.favorites.items);
    const navigation = useNavigation();
    console.log('in favorites',favoritedItems)

    function onNavigate() {
        navigation.navigate('Shop');
    }


    return (
        <View style={styles.container}>
            {
                true?(
                    <View style={styles.noItems}>
                        <Text style={styles.noItemsText}>No Favorited Items</Text>
                        <Text style={styles.noItemsSmallText}>Your favorited items will appear here. Tap to start shopping.</Text>
                        <TouchableOpacity style={styles.btn} onPress={onNavigate}>
                            <Text style={styles.btnText}>Start Shopping</Text>
                        </TouchableOpacity>
                    </View>
                ):(
                    <FlatList
                        data={favoritedItems}
                        keyExtractor={(item)=> item._id}
                        renderItem={({item})=> {
                            return (
                                <ItemCard
                                    item={item}
                                />
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
    }
})