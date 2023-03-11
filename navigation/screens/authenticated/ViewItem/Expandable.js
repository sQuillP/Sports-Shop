import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";




export default function Expandable() {

    const [isOpen, updateIsOpen] = useState(false);

    return (
        <TouchableOpacity style={styles.container}>

        </TouchableOpacity>
    );

}


const styles = StyleSheet.create({
    container: {
        
    }
});