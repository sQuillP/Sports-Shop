import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";




export default function Expandable({children}) {

    const [isOpen, updateIsOpen] = useState(false);

    function onUpdateOpen() {
        updateIsOpen(!isOpen);
    }

    return (
        <TouchableOpacity onPress={onUpdateOpen} style={styles.container}>
            <>
                {children}
            </>
        </TouchableOpacity>
    );

}


const styles = StyleSheet.create({
    container: {
        
    }
});