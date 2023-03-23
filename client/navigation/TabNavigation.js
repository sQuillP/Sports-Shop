import { View, Text } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/authenticated/home';
import Shop from './screens/authenticated/shop/Shop'
import Ionicons from '@expo/vector-icons/Ionicons';
import ShopSearch from './screens/authenticated/shop/ShopSearch';
import Bag from './screens/authenticated/bag/Bag';
import { Feather } from '@expo/vector-icons'; 
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons'; 
import Favorites from './screens/authenticated/favorites/Favorites';
import { db } from '../firebase/firebase.config';
import {ref, onValue} from 'firebase/database';
import { useEffect } from 'react';
import { addToFavorites } from '../redux/slice/favoriteSlice';
import { addToBag } from '../redux/slice/bagSlice';


//returns empty array if no value exists
function toList(obj) {
    if(!obj) return [];
    let list = [];
    Object.keys(obj).forEach(key=> {
        list.push(obj[key]);
    });
    return list;
}


const Tab = createBottomTabNavigator();

export default function TabNavigation() {

    const { user } = useSelector((store)=> store.auth);
    const bagItemCount = useSelector((store)=> store.bag.items.length);
    const favoriteItemCount = useSelector((store)=> store.favorites.items.length)
    const dispatch = useDispatch();

    // Listen for changes in rtdb with bag and favorited items.
    useEffect(()=> {
        const favoriteRef = ref(db, `/favorites/${user.uid}`);
        const favoritesListener = onValue(favoriteRef,(snapshot)=> {
            const updatedFavorites = toList(snapshot.val());
            dispatch(addToFavorites(updatedFavorites));
        });

        const bagRef = ref(db, `/bag/${user.uid}`);
        const bagListener = onValue(bagRef, (snapshot)=> {
            const updatedBag = toList(snapshot.val());
            dispatch(addToBag(updatedBag));
        })

        //cleanup, remove listeners
        return ()=> {
            bagListener();
            favoritesListener();
        }
    },[]);


    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                options={{
                    tabBarIcon:({color, size})=> {
                        return <Ionicons name='home-outline' size={25}/>
                    },
                    headerShown:false
                }}
                component={Home}

            />
            <Tab.Screen
                name="Shop"
                options={{
                    tabBarIcon:({color,size})=> {
                        return <Ionicons size={25} name='search'/>
                    },
                    header:()=> {
                        return <ShopSearch/>
                    },
                    tabBarHideOnKeyboard:true
                }}
                component={Shop}
            />
            <Tab.Screen
                name='Bag'
                options={{
                    headerShown:true,
                    title:'Bag',
                    tabBarIcon:({color,size})=> {
                        return (
                            <View style={styles.iconContainer}>
                                <Feather name="shopping-bag" size={24} color="black" />
                                {bagItemCount > 0 && (
                                    <View style={styles.quantityContainer}>
                                        <Text style={styles.quantityText}>{bagItemCount > 99? '99+': bagItemCount}</Text>
                                    </View>
                                    )
                                }
                                
                            </View>
                        )
                    }
                }}
                component={Bag}
            />
            <Tab.Screen 
                name='Favorites'
                options={{
                    tabBarIcon:()=> {
                        return (
                            <View style={styles.iconContainer}>
                                <AntDesign name="hearto" size={25} color="black" />
                                { favoriteItemCount > 0 &&(
                                    <View style={styles.quantityContainer}>
                                        <Text style={styles.quantityText}>{favoriteItemCount > 99 ? '99+':favoriteItemCount}</Text>
                                    </View>
                                    )
                                }
                            </View>
                        )
                    }
                }}
                component={Favorites}
            />
        </Tab.Navigator>
    )   
}

const styles = StyleSheet.create({
    iconContainer: {
        position:'relative'
    },
    quantityContainer: {
        height: 20,
        width:20,
        borderRadius: 10,
        position:'absolute',
        top:-3,
        right: -10,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    quantityText:{
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        fontSize: 10
    }
})