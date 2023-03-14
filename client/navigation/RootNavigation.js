import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/unauthenticated/Login';
import TabNavigation from './TabNavigation';
import { useSelector } from 'react-redux';
import SignUp from './screens/unauthenticated/Signup';
import Filter from './screens/authenticated/FilterSearch/Filter';
import ViewItem from './screens/authenticated/ViewItem/ViewItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {

    const {token} = useSelector((store)=> store.auth);


    return (
        <Stack.Navigator>

            {token ? 
                (<>
                    <Stack.Screen
                        options={{
                            headerShown:false
                        }}
                        name='TabNavigation'
                        component={TabNavigation}
                    />
                    <Stack.Screen
                        name={"Filter"}
                        options={{
                            presentation:'modal',
                            title:'Filter Options'
                        }}
                        
                        component={Filter}
                    />
                    <Stack.Screen 
                        options={
                            ({navigation})=> ({
                                presentation:'modal',
                                title: 'View Item',
                                headerTitleStyle:{
                                    fontSize: 20,
                                },
                                headerTitleAlign:'center',
                                headerLeft:(props)=> {
                                    return (
                                        <Pressable onPress={()=> navigation.goBack()}>
                                            <Ionicons name='close-outline' size={30} color='black' />
                                        </Pressable>
                                    )
                                }
                            })
                        } 
                        name="ViewItem"
                        component={ViewItem}
                    />
                    <Stack.Screen
                        name='Checkout'
                        options={{

                        }}
                        
                    />
                </>):(
                    <>
                        <Stack.Screen 
                            options={{
                                headerShown:false
                            }}
                            name='Login' component={Login}
                        />
                        <Stack.Screen
                            options={{
                                headerShown:false,
                            }}
                            name='SignUp' component={SignUp}
                         />
                    </>
                )
            }
        </Stack.Navigator>
    );
}
