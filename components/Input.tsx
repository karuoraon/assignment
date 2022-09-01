import React from 'react';
import {TextInput,StyleSheet} from 'react-native';

 const Input = (props) => {
    return <TextInput {...props} style={styles.input} />
}
const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 5,
      },
})
export default React.memo(Input);