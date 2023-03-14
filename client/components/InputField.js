import { StyleSheet, View, Text, TextInput } from "react-native";
import { GlobalStyles } from "../globals/styles";
import Ionicons from '@expo/vector-icons/Ionicons';



export default function InputField({name,value,handleChange,iconName, error=false, isPassword=false, label}) {

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={{flexDirection:'row'}}>
                <Ionicons name={iconName} size={25} color={GlobalStyles.primaryBlack}/>
                <TextInput 
                    value={value}
                    onChangeText={handleChange(name)}
                    style={styles.input}
                    secureTextEntry={isPassword}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor:GlobalStyles.primaryBlack,
        borderBottomWidth:2,
        marginBottom: 50
    },
    label: {
        fontWeight:'bold'
    }, 
    input: {
        flex: 1,
        paddingLeft: 10
    },
});