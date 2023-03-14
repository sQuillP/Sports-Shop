import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../../globals/styles";

export default function Panel({navigate, headerText, description, image}) {

    const navigation = useNavigation();

    function onNavigate(){
        navigation.navigate(navigate);
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} resizeMode="cover" source={{uri: image}}>
                <View style={styles.textContent}>
                    <Text style={styles.headerText}>{headerText}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onNavigate}>
                        <Text style={styles.buttonText}>Explore</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height/2,
        width: '100%',
        marginBottom:5
    },
    textContent: {
        padding: 20,
        alignItems:'flex-start',
        backgroundColor:'rgba(0,0,0,0.6)'
    },
    headerText: {
        color:'white',
        fontSize:35,
        fontWeight:'bold'
    },
    description: {
        fontSize:20,
        color:'white',
        fontWeight:'bold',
        marginBottom: 10
    },
    image: {
        flex: 1,
        justifyContent:'flex-end'
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical:8,
        borderRadius: 10,
        backgroundColor:GlobalStyles.primaryBlack
    },
    buttonText: {
        textAlign:'center',
        fontWeight:'bold',
        color:'white',
    }
});