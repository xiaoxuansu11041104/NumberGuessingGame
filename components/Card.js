import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Card({children}) {
  return (
    <View style = {styles.card}>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        width: 300, // width of the card
        height: 500, // height of the card
        backgroundColor: 'grey', // grey background
        borderRadius: 10, // rounded corners
        padding: 20, // padding inside the card
        alignItems: 'center', // center the content horizontally
        justifyContent: 'center', // center the content vertically
        marginVertical: 10, // space between the cards
        
    },
})