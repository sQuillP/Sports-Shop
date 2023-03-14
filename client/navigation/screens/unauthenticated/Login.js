import { Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, StyleSheet, Image, Pressable, Dimensions, TextInput, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { GlobalStyles } from "../../../globals/styles";
import {Formik} from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slice/authSlice";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../../components/InputField";

const signInSchema = Yup.object().shape({
    Email: Yup.string().email().required('Email is required'),
    Password: Yup.string().required('Please provide password')
});

const initialValues = {
    Email:'',
    Password:'',
};

export default function Login() {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    function navigateSignUp() {
        navigation.navigate('SignUp');
    }
 
    function onLogin(credentials) {
        console.log(credentials)
        dispatch(login(credentials));
    }

    return (

            <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
            <KeyboardAvoidingView style={{flex:1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>

                        <View style={styles.headerContainer}>
                            <Image source={require('../../../assets/nike-logo.webp')} style={styles.logo}/>
                            <Text style={styles.header}>Sign in</Text>
                        </View>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={signInSchema}
                            onSubmit={onLogin}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, errors, submitCount })=> {
                                return (
                                    <View style={{width:'85%', flex: 1, justifyContent:'space-around', alignItems:'center'}}>
                                        <View style={{width:"85%"}}>
                                            <InputField
                                                name={"Email"}
                                                value={values.Email}
                                                handleChange={handleChange}
                                                iconName={'mail-outline'}
                                                error={errors.Email}
                                                label={'Email'}
                                            />
                                            <InputField
                                                name={'Password'}
                                                value={values.Password}
                                                handleChange={handleChange}
                                                iconName={'lock-closed-outline'}
                                                error={errors.Password}
                                                isPassword={true}
                                                label={'Password'}
                                            />
                                            {submitCount > 0 && (errors.Email || errors.Password) && <Text style={styles.error}>Invalid email or password</Text>}
                                            <TouchableOpacity onPress={navigateSignUp}>
                                                <Text style={styles.signUpText}>Not a member yet? Tap here to sign up!</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Pressable style={styles.loginBtn} onPress={handleSubmit}>
                                            <Text style={styles.loginText}>Login</Text>
                                        </Pressable>
                                    </View>
                                )
                                
                            }}
                        </Formik>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent:'space-around',
        alignItems:'center'
    },
    headerContainer: {
        alignItems:'center',
    },
    header: {
        fontSize: 35,
        textAlign:'center',
        fontWeight:'bold',
    },
    logo: {
        height:130,
        width: 130,
        resizeMode:'contain'
    },
    inputContainer: {
        borderBottomColor:GlobalStyles.primaryBlack,
        borderBottomWidth:2,
        marginBottom: 50
    },
    label: {
        fontWeight:'bold'
    },  
    input: {
        flex: 1,
        paddingLeft: 10
    },
    loginBtn: {
        backgroundColor:GlobalStyles.primaryBlack,
        width:'75%',
        paddingVertical:10
    },
    loginText: {
        color:'white',
        fontSize:25,
        textAlign:'center'
    },
    signUpText: {
        color:'teal',
        fontSize:15
    },
    error: {
        color:'red', 
        textAlign:'center',
        fontSize: 15,
        marginBottom:15
    }
})