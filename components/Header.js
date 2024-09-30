import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Welcome</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignItems: 'center',

  },
  header: {
    fontSize: 25,
    color: 'purple',
    fontWeight: 'bold',
  },

})