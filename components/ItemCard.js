import { StyleSheet, Image, View, Text } from "react-native";




export default function ItemCard({uri, name, price}) {



    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri}}/>
            <View style={styles.productInfo}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow:'hidden',
        borderRadius: 10,
        marginHorizontal: 5,
        width: 125,
        backgroundColor:'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        
    },
    image: {
        height: 125,
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