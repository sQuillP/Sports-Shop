import { View, Pressable, Image, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { Formik } from "formik";
import InputField from "../../../components/InputField";
import { GlobalStyles } from "../../../globals/styles";
import { signUp } from "../../../redux/slice/authSlice";

const formSchema= Yup.object().shape({
    email: Yup.string().email().required("Please provide an email"),
    password: Yup.string()
        .length(5, "Length must be 5 characters")
        .required("Please provide a password"),
    firstName: Yup.string()
        .required("Must provide a name"),
    lastName: Yup.string()
        .required("Please provide a last name"),
});

const initialValues = {
    email:'',
    password:'',
    firstName:'',
    lastName:'',
};


export default function SignUp() {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    function onRegister(form) {
        console.log('submitting form', form);
        dispatch(signUp(form));
    }


    function onNavigateLogin() {
        navigation.navigate('Login');
    }

    return (

        <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
            <KeyboardAwareScrollView >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View>
                            <Image
                                source={require("../../../assets/nike-logo.webp")}
                                style={styles.logo}
                            />
                            <Text style={styles.headerText}>Sign Up</Text>
                        </View>
                        <Formik
                            validationSchema={formSchema}
                            initialValues={initialValues}
                            onSubmit={onRegister}
                        >
                            {
                                ({touched, errors, values, submitCount, handleChange, handleSubmit})=> {
                                    return (
                                        <View style={styles.formContainer}>
                                            <View style={styles.fields}>
                                                <InputField
                                                    handleChange={handleChange}
                                                    name={'email'}
                                                    label={"Email"}
                                                    iconName={"mail-outline"}
                                                    value={values.email}
                                                />
                                                <InputField
                                                    handleChange={handleChange}
                                                    name={'password'}
                                                    label={'Password'}
                                                    iconName={'lock-closed-outline'}
                                                    value={values.password}
                                                    isPassword={true}
                                                />
                                                <InputField
                                                    handleChange={handleChange}
                                                    label={'First Name'}
                                                    name={'firstName'}
                                                    iconName={'person-outline'}
                                                    value={values.firstName}
                                                />
                                                <InputField
                                                    handleChange={handleChange}
                                                    label={'Last Name'}
                                                    name={'lastName'}
                                                    value={values.firstName}
                                                />
                                            </View>
                                            {submitCount > 0 && (!!Object.keys(errors).length) && <Text style={{color:'red',fontSize:20}}>Please provide correct values</Text>}
                                            <Pressable onPress={onNavigateLogin}>
                                                <Text style={{fontSize:15, color:'cyan',textAlign:'center'}}>Already a member? Tap here to log in.</Text>
                                            </Pressable>
                                            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                                                <Text style={styles.btnText}>Sign Up</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                            }
                        </Formik>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        borderColor:'black',
        flex: 1
    },
    formContainer: {
        width:'80%',
        alignItems:'center',
        flex: 1
    },
    fields: {
        width: '100%'
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode:'contain'
    },
    headerText: {
        fontSize: 35,
        textAlign:'center',
        fontWeight:'bold'
    },
    submitBtn: {
        width:'80%',
        marginTop: 50,
        backgroundColor:GlobalStyles.primaryBlack
    },
    btnText: {
        textAlign:'center',
        color:'white',
        fontSize:20,
        paddingVertical:10
    }
});