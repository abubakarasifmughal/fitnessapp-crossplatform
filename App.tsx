import { SafeAreaView, StyleSheet, } from 'react-native'
import React from 'react'
import { BottomTabs } from './src/router/bottomtabs/BottomTabs';
import VideoComponent from './src/components/VideoComponent';


export default function App() {

  return (
    <SafeAreaView style={{ overflow: 'scroll' }}>
      <BottomTabs />
      <VideoComponent />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})