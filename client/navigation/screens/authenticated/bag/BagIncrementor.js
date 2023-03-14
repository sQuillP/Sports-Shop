import { Pressable, StyleSheet, View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 




export default function BagIncrementor({quantity, updateQuantity }) {


    function onUpdateQuantity(amount) {

        return ()=> {
            updateQuantity(q => q + amount);
        }
    }

    
    return (
        <View style={styles.container}>
            <Text style={{textAlign:'center'}}>Quantity</Text>
            <View style={styles.content}>
                <Pressable style={styles.btn} onPress={onUpdateQuantity(-1)}>
                    <AntDesign name="down" size={15} color="gray" />
                </Pressable>
                <Text style={styles.quantity}>{quantity}</Text>
                <Pressable style={styles.btn} onPress={onUpdateQuantity(1)}>
                    <AntDesign name="up" size={15} color="gray" />
                </Pressable>
            </View>
        </View>
    );


}


const styles = StyleSheet.create({
    container: {
        marginLeft:10
    },
    content: {
        flexDirection:'row',
        alignItems:'center'
    },
    btn: {
        justifyContent:'center',
        alignContent:'center',
        padding:3
    },
    quantity: {
        marginHorizontal:5
    }
})