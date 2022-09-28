import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { } from 'react'
import { BottomTabs } from './src/router/bottomtabs/BottomTabs';



const App = () => {
  return (

    <SafeAreaView style={{ overflow: 'scroll' }}>
      <BottomTabs />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})