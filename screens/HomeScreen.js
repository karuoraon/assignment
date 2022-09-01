import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import Firebase from '../firebase';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Items from './Items';

const auth = Firebase.auth();
const productdb = Firebase.firestore().collection('products');
const HomeScreen = ({navigation}) => {
  const [DATA,setData] = useState([]);
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
          <Icon style={{ fontSize: 25 }} type="material" name="logout" color="#000" onPress={async () =>{
            // navigation.replace("Login")
            auth.signOut()
            }} />
          ),
        });
      }, [navigation]);
      useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
             if(!user){
                 navigation.replace("Login")
             }
         })
         getData();
         return unsubscribe;
     }, [])
     const getData = () => {
      productdb.onSnapshot(querySnapshot => {
        const products =[];
        querySnapshot.forEach((doc)=>{
          const { name, price, offerPrice, product_image } = doc.data();
          products.push({
            id: doc.id,
            name,
            price,
            offerPrice,
            product_image,
          })
        })
        setData(products)
       });
     }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnAdd} onPress={()=>navigation.navigate("AddProduct")}><Text style={{textAlign:'center',color:'#fff',fontWeight:'bold'}}>Add Product</Text></TouchableOpacity>
      <FlatList
        numColumns={2}
        data={DATA}
        renderItem={({item,index})=><Items data={item} index={index}/>}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{ flex: 1, flexDirection:'column', padding:10 },
    btnAdd:{
      backgroundColor:'#000',borderRadius:10,
      alignSelf:'flex-end',
      padding:10,
      borderRadius:10,
      shadowColor: '#cfcaca',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
    },
})