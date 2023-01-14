import {React, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native'
import colors  from '../utils/colors';
import {TextInput} from 'react-native-paper'

export const Focus = () => {
  const [text, setText] = useState('')
  return(

  <View style={styles.container}>
  <View style={styles.inputContainer}>
    <TextInput  label='What would you like to focus on?'   value={text}
      onChangeText={text => setText(text)}  />
  </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer:{
    flex:0.5,
padding:25,
justifyContent:'top',
  },
  text: {
    color: colors.white,
    
  }
})