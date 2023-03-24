import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CategoryChip from "./CategoryChip";
import { useDispatch } from "react-redux";
import { changeCategory } from "../../../../redux/slice/itemCategorySlice";
import { searchItem } from "../../../../redux/slice/itemCategorySlice";
import axios from 'axios';


const categories = [
    {name:'Shoes', selection:'shoes', id: 1},
    {name:'Clothing', selection:'clothing', id: 2},
    {name:'Sports Gear', selection:'equipment', id: 3},
];


function useDebounce(term, delay){
    const [debouncedTerm, updateDebouncedTerm] = useState(term)

    useEffect(()=> {
        const timeout = setTimeout(()=> {
            updateDebouncedTerm(term);
        }, delay)
        return ()=> clearTimeout(timeout);
    },[term, delay]);

    return debouncedTerm;
}



export default function ShopSearch(){

    const [searchTerm, updateSearchTerm] = useState('');
    const debouncedTerm = useDebounce(searchTerm, 1000);
    const [category, updateSelectedCategory] = useState('shoes');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(()=> {
        if(!debouncedTerm) return;

        dispatch(searchItem({name:category, options:{params:{limit:25, name:debouncedTerm}}}))
    },[debouncedTerm]);

    useEffect(()=> {
        dispatch(searchItem({name:category, options:{limit:25}}));
    },[])

    function onUpdateSelectedCategory(selectedCategory) {

        if(selectedCategory === category)
            return;

        dispatch(changeCategory(selectedCategory));
        dispatch(searchItem({name:selectedCategory, options:{params:{limit:25}}}));
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
                                selection={item.selection}
                                onPress={onUpdateSelectedCategory}
                                selected= {category === item.selection}
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