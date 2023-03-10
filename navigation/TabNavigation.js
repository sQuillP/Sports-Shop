import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/authenticated/home';
import Shop from './screens/authenticated/shop/Shop'
import Ionicons from '@expo/vector-icons/Ionicons';
import ShopSearch from './screens/authenticated/shop/ShopSearch';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {

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
        </Tab.Navigator>
    )
    
}