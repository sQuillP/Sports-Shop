import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function ItemCard({item}) {

    const navigation = useNavigation();

    function onNavigate(){
        navigation.navigate('ViewItem',{item});
    }

    return (
        <TouchableOpacity onPress={onNavigate} style={styles.container}>
            <Image style={styles.image} source={{uri: item.image}}/>
            <View style={styles.productInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow:'hidden',
        borderRadius: 10,
        margin: 5,
        width: 150,
        backgroundColor:'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        
    },
    image: {
        height: 150,
        width: '100%',
        resizeMode:'cover'
    },
    productInfo: {
        padding:10
    },
    name: {
        fontWeight:'bold',
    },
    price: {

    },
});