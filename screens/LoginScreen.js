import { KeyboardAvoidingView, StyleSheet, Text , TouchableOpacity, View, Platform, AsyncStorage, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Input } from '../components/';
import Firebase from '../firebase';

const auth = Firebase.auth();
const LoginScreen = () => {
    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    const [isSignUp,setisSignUp] = useState(false);
    const navigation = useNavigation()

    useEffect(()=>{
       const unsubscribe = auth.onAuthStateChanged(user=>{
            if(user){
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, [])
    const signUp = () => {
        auth.createUserWithEmailAndPassword(Email,Password)
        .then(async userCredentials=>{
            const user = userCredentials.user;
            console.log(user.email);
            Alert.alert("Success","You are registered successfully.")
        })
        .catch(error=>Alert.alert("Info",error.message))
        // auth.signInWithEmailAndPassword(Email, Password);
    }
    const signIn = () => {
        if(isSignUp){
            signUp();
        }
        else{
        auth.signInWithEmailAndPassword(Email,Password)
        .then(userCredentials=>{
            const user = userCredentials.user;
            // console.log(user.email);
        })
        .catch(error=>Alert.alert("Info",error.message))
        // auth.signInWithEmailAndPassword(Email, Password);
    }
    }
  return (
    <KeyboardAvoidingView style={styles.container} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.loginContainer}>
            <Input
            placeholder='Email'
            value={Email}
            onChangeText={text=>setEmail(text)}
            autoComplete="email"
            />
            <Input
            placeholder='Password'
            value={Password}
            onChangeText={text=>setPassword(text)}
            autoComplete="password"
            secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
            onPress={signIn} 
            style={styles.button}>
                <Text style={styles.buttontxt}>{isSignUp?'Sign Up':'Sign In'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>setisSignUp(!isSignUp)} 
            style={[styles.button,styles.buttonOutline]}>
                <Text style={styles.buttontxtOutline}>{!isSignUp?'Sign Up':'Sign In'}</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    loginContainer:{
        width:'80%'
    },
    buttonContainer:{
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 40,
    },
    button:{
        backgroundColor:'#000',
        width:'100%',
        padding:12,
        borderRadius:20,
    },
    buttonOutline:{
        backgroundColor:'#fff',
        marginTop:5,
        borderColor:'#000',
        borderWidth:2,
    },
    buttontxt:{
        color:'#fff',
        fontWeight:'700',
        fontSize:18,
        textAlign:'center',

    },
    buttontxtOutline:{
        color:'#000',
        fontWeight:'700',
        fontSize:18,
        textAlign:'center',        
    }
})