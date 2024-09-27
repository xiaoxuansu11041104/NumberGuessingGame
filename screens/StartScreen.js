import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'

export default function StartScreen() {
  return (
    <View style={styles.container}>
        {/* display the header here */}
        <Header /> 
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',    
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
    text: {
        fontSize: 20,
    },
})