import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Firebase from '../firebase';
import { Input } from '../components/';
// import { Dialog } from "react-native-elements";

const EditProduct = ({ route, navigation }) => {
    const { item } = route.params;
    console.log(item);
    const productdb = Firebase.firestore().collection('products').doc(item.id);
    const [ProductName,setProductName] = useState(item.name);
    const [Price,setPrice] = useState(item.price);
    const [Offer,setOffer] = useState(item.offerPrice);
    const [image,setimage] = useState(item.product_image);
    const [isLoading,setisLoading] = useState(false);
    const pickImage = async () => {
        console.log('s');
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
            setisLoading(true);
          let d = new Date();
          let imgname='Product'+d.getTime();
          uploadImage(result.uri,imgname)
            .then(() => {
            //   alert("Success");
            setisLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
      const uploadImage = async (uri,imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
    
        var ref = Firebase.storage().ref().child("images/" + imageName);
        const d = await ref.put(blob);
        const url = await ref.getDownloadURL().catch((error) => { throw error });
        setimage(url);
        return d;
      }
      const SubmitFunc = () => {
        setisLoading(true);
          if(ProductName==''){
            setisLoading(false);
            Alert.alert('Info','Please Enetr the Product Name');
            return false;
          }
          else if(Price==''){
            setisLoading(false);
            Alert.alert('Info','Please Enetr the Price');
            return false;
          }
          else if(Offer==''){
            setisLoading(false);
            Alert.alert('Info','Please Enetr the Offer');
            return false;
          }
          else if(image==''){
            setisLoading(false);
            Alert.alert('Info','Please Add a Image');
            return false;
          }
          else{
            Alert.alert(
                'Confirm',
                'Do you want to save ?',
                [
                  {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                  {text: 'YES', onPress: () => {
                    let data={
                        name:ProductName,
                        price:Price,
                        offerPrice:Offer,
                        product_image:image,
                      };
                      console.log(data);
                      productdb.set(data).then(()=>{
                        setisLoading(true);
                        Alert.alert("Success","your data hase been Updated.");
                        navigation.replace('Home');
                      })
                      .catch((error)=>{
                        setisLoading(true);
                        console.log(error);
                      })
                  }},
                ]
              );
          }
        }
    const deleteData = () => {
            Alert.alert(
              'Delete',
              'Really?',
              [
                {text: 'Yes', onPress: () => {
                    productdb.delete().then((res) => {
                    Alert.alert("Success","your data hase been delete.")
                    navigation.replace('Home');
                    })
                }},
                {text: 'No', onPress: () => console.log('Item not deleted'), style: 'cancel'},
              ],
              { 
                cancelable: true 
              }
            );
          }
  return (
    <View style={styles.container}>
    <KeyboardAvoidingView style={styles.textFields} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Input
        placeholder='Enter Product Name'
        value={ProductName}
        onChangeText={text => setProductName(text)}
      />
      <Input
        placeholder='Enter Price'
        value={Price}
        onChangeText={text => setPrice(text)}
        keyboardType="numeric"
      />
      <Input
        placeholder='Enter Offer Price'
        value={Offer}
        onChangeText={text => setOffer(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={pickImage} style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>Pick a Image</Text>
      </TouchableOpacity>
      {image != "" && <Image source={{ uri: image }} style={{ marginTop: 10, width: 200, height: 200 }} />}
    </KeyboardAvoidingView>
    <View style={{ marginTop: 10, flexDirection: 'column' }}>
        <TouchableOpacity style={{ backgroundColor: '#000', padding: 12, marginTop: 10, borderRadius: 20 }} onPress={SubmitFunc}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>Edit Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#de3d2a', padding: 12, marginTop: 10, borderRadius: 20 }} onPress={deleteData}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>Delete Product</Text>
        </TouchableOpacity>
      </View>
      {/* <Dialog isVisible={isLoading}>
      <Dialog.Loading />
      </Dialog> */}
    </View>
  )
}

export default EditProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
      },
      textFields: {
        padding: 10,
        backgroundColor:'#f0f0f0'
      }
})