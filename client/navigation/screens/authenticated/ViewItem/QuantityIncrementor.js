import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { GlobalStyles } from "../../../../globals/styles";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function QuantityIncrementor({increment, value}) {

    

    return (
        <View style={styles.container}>
            <View style={styles.incrementor}>
                <TouchableOpacity style={styles.btn} onPress={()=> {
                    increment((num)=>num-1);
                }}>
                    <Ionicons name="remove" style={styles.btnText} size={25} color='white'/>
                </TouchableOpacity>
                <Text style={styles.amount}>{value}</Text>
                <TouchableOpacity style={styles.btn} onPress={()=> {
                    increment((num)=> num+1);
                }}>
                    <Ionicons name="add" style={styles.btnText} size={25} color='white'/>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        
    },
    incrementor: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    btn: {
        backgroundColor:GlobalStyles.primaryBlack,
        paddingHorizontal: 7,
        paddingVertical: 7,
        borderRadius: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText: {
    },
    amount: {
        fontSize: 25,
        fontWeight:'bold',
        marginHorizontal: 10
    }

})