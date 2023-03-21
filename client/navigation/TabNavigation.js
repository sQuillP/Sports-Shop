import { View, Text } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/authenticated/home';
import Shop from './screens/authenticated/shop/Shop'
import Ionicons from '@expo/vector-icons/Ionicons';
import ShopSearch from './screens/authenticated/shop/ShopSearch';
import Bag from './screens/authenticated/bag/Bag';
import { Feather } from '@expo/vector-icons'; 
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons'; 
import Favorites from './screens/authenticated/favorites/Favorites';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {

    const bagQuantity = useSelector((store)=> store.bag.items.length) || 500;
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
                            <View style={styles.bagContainer}>
                                <Feather name="shopping-bag" size={24} color="black" />
                                <View style={styles.bagQuantity}>
                                    <Text style={styles.quantityText}>{bagQuantity > 99? '99+': bagQuantity}</Text>
                                </View>
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
                        return <AntDesign name="hearto" size={25} color="black" />
                    }
                }}
                component={Favorites}
            />
        </Tab.Navigator>
    )   
}

const styles = StyleSheet.create({
    bagContainer: {
        position:'relative'
    },
    bagQuantity: {
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