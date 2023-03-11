import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CategoryChip from "./CategoryChip";
import { useDispatch } from "react-redux";
import { changeCategory } from "../../../../redux/slice/itemCategorySlice";

const categories = [
    {name:'Shoes', id: 1},
    {name:'Clothing', id: 2},
    {name:'Sports Wear', id: 3},
];

export default function ShopSearch(){

    const [searchTerm, updateSearchTerm] = useState('');
    const [category, updateSelectedCategory] = useState('Shoes');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    function onUpdateSelectedCategory(selectedCategory) {

        if(selectedCategory === category)
            return;

        dispatch(changeCategory(selectedCategory));
        updateSelectedCategory(selectedCategory);
    }

    function onNavigateFilterSettings() {
        navigation.navigate('Filter');
    }



    return (
        <SafeAreaView style = {styles.main}>
            <View style={styles.container}>
                <Ionicons name="search" size={25} color='black'/>
                <TextInput
                    onChangeText={(text)=>updateSearchTerm(text)}
                    value={searchTerm}
                    style={{flex: 1, paddingLeft: 10}}
                    placeholder='Search an item...'
                />
            </View>
            <View style={{marginTop: 10}}>
                <FlatList
                    data={categories}
                    horizontal={true}
                    renderItem={({item})=> {
                        return (
                            <CategoryChip
                                label={item.name}
                                onPress={onUpdateSelectedCategory}
                                selected= {category === item.name}
                            />
                        )
                    }}
                />
            </View>
            <Pressable onPress={onNavigateFilterSettings} style={styles.filterOptions}>
                <Ionicons name="filter-outline" color={'black'} size={25}/>
                <Text style={{marginLeft:5}}>Filter Settings</Text>
            </Pressable>
        </SafeAreaView>
    )
}


const styles= StyleSheet.create({
    main: {
        padding: 10,
        borderBottomColor:'lightgray',
        borderBottomWidth: 2
    },
    container: {
        flexDirection:'row',
        borderRadius: 10,
        backgroundColor:'lightgray',
        padding: 10
    },
    filterOptions: {
        paddingTop: 15,
        flexDirection:'row',
        alignItems:'center'
    },
})