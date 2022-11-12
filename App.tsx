import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import BottomRouter from './src/routes/BottomRouter'


const App = () => {
  return (
    <SafeAreaView style={{backgroundColor:'rgb(200,200,200)',height:"100%"}}>
      <BottomRouter />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})