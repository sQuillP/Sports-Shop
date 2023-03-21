import {View, Pressable, StyleSheet, Text} from 'react-native'
import { GlobalStyles } from '../../../../globals/styles'




export default function CategoryChip({onPress, label, selection, selected}) {

    function onPressChip() {
        onPress(selection);
    }



    return (
        <Pressable style={[styles.container, {backgroundColor: selected?'white':GlobalStyles.primaryBlack}]} onPress={onPressChip}>
            <Text style={[styles.text, {color: selected?GlobalStyles.primaryBlack:'white'}]}>{label}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    text: {
        textAlign:'center',
        fontWeight:'bold'
    }
})