import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootNavigation from './navigation/RootNavigation';
import { mainStore } from './redux/store/store';
import {StripeProvider} from '@stripe/stripe-react-native'
export default function App() {
  return (
    <StripeProvider
      publishableKey='key'
      merchantIdentifier='merchant.identifier'
    >
      <Provider store={mainStore}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style='dark'/>
            <RootNavigation/>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
