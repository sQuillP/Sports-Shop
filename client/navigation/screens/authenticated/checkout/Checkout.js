import {useStripe} from "@stripe/stripe-react-native";
import { useState, useEffect } from "react";
import { Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import { GlobalStyles } from "../../../../globals/styles";
import { AntDesign } from '@expo/vector-icons';

const API_URL = "http://10.0.2.2:3000"

export default function Checkout() {
    
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
      const res = await response.json();
      console.log(res);
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Sports-Shop",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        /*  Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            methods that complete payment after a delay, like SEPA Debit and Sofort*/
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
        if(!loading) return;
        const { error } = await presentPaymentSheet();
        if (error) {
            if(error.code.toLowerCase() === 'canceled')
                Alert.alert("Payment Canceled","You have not been charged")
            else
                Alert.alert(`Error: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
            //clear the cart and all items
        }
    };

    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
        <TouchableOpacity
          variant="primary"
          title="Checkout"
          onPress={openPaymentSheet}
          activeOpacity={0.7}
          style={styles.container}
        >
            <Text style={[styles.btnText,{color:loading?'white':'gray'}]}>Checkout</Text>
            <AntDesign name="checkcircleo" size={20} color={loading?"white":"gray"}/>
        </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        backgroundColor:GlobalStyles.primaryBlack,
        borderRadius: 20,
        width: '75%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText: {
        textAlign:'center',
        fontWeight:'bold',
        marginRight: 10
    },

  })