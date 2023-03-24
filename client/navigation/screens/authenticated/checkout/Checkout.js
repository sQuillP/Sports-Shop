import {useStripe} from "@stripe/stripe-react-native";
import { useState, useEffect } from "react";
import { Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import { GlobalStyles } from "../../../../globals/styles";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { db } from '../../../../firebase/firebase.config';
import {ref, set} from 'firebase/database';
import { useSelector } from "react-redux";

const API_URL = "http://10.0.2.2:3000"

export default function Checkout({paymentAmount}) {
    
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store)=> store.auth);


    const fetchPaymentSheetParams = async () => {
      try{
        const res = await axios.post(`${API_URL}/payment-sheet`, {
          amount:paymentAmount
        });
        const { paymentIntent, ephemeralKey, customer } =  res.data
        return {
          paymentIntent,
          ephemeralKey,
          customer
        };
      } catch(error) {
        console.log('in fetchpaymentsheetparams',error.message);
      }
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
        console.log('payment sheet')
        const { error } = await presentPaymentSheet();
        if (error) {
            if(error.code.toLowerCase() === 'canceled')
                Alert.alert("Payment Canceled","You have not been charged")
            else
                Alert.alert(`Error: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
            //clear the cart and all items
            //Get a new payment sheet/payment intent, you cannot use the same payment intent
            const dbRef = ref(db,`/bag/${user.uid}`);
            try {
              await set(dbRef,null);
              await initializePaymentSheet();
            } catch(error) {
              console.log('Unable to clear cart: ', error.message);
            }
        }
    };

    useEffect(() => {
      if(paymentAmount)
        initializePaymentSheet();
    }, [paymentAmount]);
  
    return (
        <TouchableOpacity
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