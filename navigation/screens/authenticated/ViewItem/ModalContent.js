import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { GlobalStyles } from "../../../../globals/styles"
import Ionicons from '@expo/vector-icons/Ionicons'
export default function ModalContent({closeModal, success = true}) {
    
    function displayMessage() {
        if(success)
            return "Added to bag!";
        return "Unable to add to bag.";
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.modalHeader}>{displayMessage()}</Text>
                <Text style={styles.modalDescription}>Feel free to check out when you are ready.</Text>
                {/* <Ionicons style={styles.icon} name="checkmark-circle-outline" color='green' size={35}/> */}
                <TouchableOpacity onPress={closeModal} style={styles.btn}>
                    <Text style={{textAlign:'center', color:'white', fontSize:20}}>Ok</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    content: {
        backgroundColor:'white',
        borderRadius: 5,
        padding: 35,
        elevation: 2,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        alignItems:'center',
        width:'90%'
    },
    modalHeader: {
        textAlign:'center',
        fontSize: 25
    },
    modalDescription: {
        marginVertical:15,
        textAlign:'center',
        fontSize: 18
    },
    icon: {
        marginVertical: 20
    },
    btn: {
        backgroundColor:GlobalStyles.primaryBlack,
        paddingVertical: 10,
        width:'100%',
        borderRadius: 20,
    }
})