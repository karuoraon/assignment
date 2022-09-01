import { StyleSheet, Text, TouchableOpacity, View,Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

const Items = ({data,index}) => {
    console.log(data);
    const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card} key={index} onPress={()=>navigation.navigate('EditProduct', {item: data})}>
        <View style={styles.imageView}>
            <Image style={styles.product_img}  source={{uri: data.product_image}} />
        </View>
        <View style={styles.detailView}>
            <Text style={styles.textdetails}>{data.name}</Text>
            <Text style={[styles.textdetails,{textDecorationLine:'line-through'}]}> ₹ {data.price}</Text>
            <Text style={styles.textdetails}>₹ {data.offerPrice}</Text>
        </View>
        {/* <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}><Text style={styles.textBtn}>Edit</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.textBtn}>Delete</Text></TouchableOpacity>
        </View> */}
    </TouchableOpacity>
  )
}

export default Items

const styles = StyleSheet.create({
    card:{
        marginVertical: 8,
        marginHorizontal: 10,
        marginTop:10,
        borderRadius:10,
        backgroundColor:'#fff',
        shadowColor: '#e8e6e6',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
    },
    imageView:{
        borderRadius:10,
    },
    product_img:{
        borderRadius:10,
        // height:100,
        width:165,
        height:165,
    },
    detailView:{
        marginTop:10,
        padding:10,
    },
    textdetails:{
        fontWeight:'bold'
    },
    button:{
        backgroundColor:'blue',
        borderRadius:10,
        width:100,
    },
    textBtn:{
        color:'#fff',
        textAlign:'center',
    }
})