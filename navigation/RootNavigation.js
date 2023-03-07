import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/unauthenticated/Login';
import TabNavigation from './TabNavigation';
import { useSelector } from 'react-redux';
import SignUp from './screens/unauthenticated/Signup';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {

    const {token} = useSelector((store)=> store.auth);

    //handle sign in logic here.

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
                </>):(
                    <>
                        <Stack.Screen 
                            options={{
                                headerShown:false
                            }}
                            name='Login' component={Login}/>
                        <Stack.Screen name='SignUp' component={SignUp}/>
                    </>
                )
            }
        </Stack.Navigator>
    );
}
