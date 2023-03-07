import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/authenticated/home';

import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {

    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                options={{
                    tabBarIcon:({color, size})=> {
                        return <Ionicons name='home-outline' size={25}/>
                    }
                }}
                component={Home}/>
        </Tab.Navigator>
    )
    
}