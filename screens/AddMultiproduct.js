import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Firebase from '../firebase';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Input } from '../components/';

// import { Dialog } from "react-native-elements";

const metaData = [{ ProductName: '', Price: '', Offer: '', image: '' }];
const AddMultiproduct = () => {
  const productdb = Firebase.firestore().collection('products');
  const [List, setList] = useState(metaData);
  const [isLoading,setisLoading] = useState(false);
  const pickImage = async (index) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
    console.log(index);
    if (!result.cancelled) {
      setisLoading(true);
      let d = new Date();
      let imgname='Product'+d.getTime();
      uploadImage(result.uri,imgname,index)
        .then(() => {
          // alert("Success");
          setisLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const uploadImage = async (uri,imageName,index) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = Firebase.storage().ref().child("images/" + imageName);
    const d = await ref.put(blob);
    const url = await ref.getDownloadURL().catch((error) => { throw error });
    console.log(imageName);
    console.log(url);
    DynamicApprochState(url, index, 'image');
    return d;
  }
 
  const DynamicApprochState = (value, index1, name) => {
    setList(() => List.map((item, index) => {
      if (index != index1) {
        return item;
      }
      else {
        if (name == 'ProductName') {
          return { ...item, ProductName: value };
        }
        else if (name == 'Price') {
          return { ...item, Price: value };
        }
        else if (name == 'Offer') {
          return { ...item, Offer: value };
        }
        else if (name == 'image') {
          return { ...item, image: value };
        }
      }
    }));
    // setList(newstate);
  }
  const SubmitFunc = () => {
    setisLoading(true);
    const ListDat = List.filter((element)=>{
      if(element.ProductName==''){
        setisLoading(false);
        Alert.alert('Info','Please Enetr the All Field');
      }
      else if(element.Price==''){
        setisLoading(false);
        Alert.alert('Info','Please Enetr the All Field');
      }
      else if(element.Offer==''){
        setisLoading(false);
        Alert.alert('Info','Please Enetr the All Field');
      }
      else if(element.image==''){
        setisLoading(false);
        Alert.alert('Info','Please Enetr the All Field');
      }
      else{
      return element;
      }
    })
    if(ListDat.length===List.length){
      List.forEach((element)=>{
        let data={
          name:element.ProductName,
          price:element.Price,
          offerPrice:element.Offer,
          product_image:element.image,
        };
        console.log(data);
        productdb.add(data).then(()=>{
          console.log('sucess');
        })
        .catch((error)=>{
          console.log(error);
        })
      })
      setisLoading(true);
      Alert.alert("Success","your Data has been Saved!");
    }
  }
  const appendList = () => {
    const list = [...List];
    list.push(metaData[0]);
    console.log(list);
    setList(list);
  }
  const removeList = (index2) => {
    console.log(index2);
    const list = List.filter((element,index)=>index!=index2)
    setList(list);
  }
  const renderItem = ({ item, index }) => {
    return <KeyboardAvoidingView style={styles.textFields} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} key={index}>
      <TouchableOpacity style={styles.addlistBtn} onPress={()=>removeList(index)}>
      <Icon style={{ fontSize: 20 }} type="material" name="trash-can" color="#fff" />
      </TouchableOpacity>
      <Input
        placeholder='Enter Product Name'
        value={item.ProductName}
        onChangeText={text => DynamicApprochState(text, index, 'ProductName')}
      />
      <Input
        placeholder='Enter Price'
        value={item.Price}
        onChangeText={text => DynamicApprochState(text, index, 'Price')}
        keyboardType="numeric"
      />
      <Input
        placeholder='Enter Offer Price'
        value={item.Offer}
        onChangeText={text => DynamicApprochState(text, index, 'Offer')}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={() => pickImage(index)} style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>Pick a Image</Text>
      </TouchableOpacity>
      {item.image != "" && <Image source={{ uri: item.image }} style={{ marginTop: 10, width: 200, height: 200 }} />}
    </KeyboardAvoidingView>
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ backgroundColor: '#000', padding: 10,marginRight:5, alignSelf: 'flex-end', borderRadius:10 }} onPress={appendList}>
      <Icon style={{ fontSize: 20 }} type="material" name="plus-circle" color="#fff" />
      </TouchableOpacity>
      <FlatList
        data={List}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={<View style={{height:60}} />}
      />
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity style={{ backgroundColor: '#000', padding: 12, marginTop: 10, borderRadius: 20 }} onPress={SubmitFunc}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>Add Product</Text>
        </TouchableOpacity>
      </View>
      {/* <Dialog isVisible={isLoading}>
      <Dialog.Loading />
      </Dialog> */}
    </View>
  )
}

export default AddMultiproduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  addlistBtn:{
    backgroundColor: '#de3d2a', 
    padding: 6,marginRight:5, 
    alignSelf: 'flex-end', 
    borderRadius:10,
    shadowColor: '#cfcaca',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  textFields: {
    padding: 10,
    borderRadius:10,
    backgroundColor:'#f0f0f0',
    shadowColor: '#cfcaca',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
})