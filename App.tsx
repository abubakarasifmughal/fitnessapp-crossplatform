import { SafeAreaView, StyleSheet, } from 'react-native'
import React from 'react'
import { BottomTabs } from './src/router/bottomtabs/BottomTabs';
import VideoComponent from './src/components/VideoComponent';
import BT from './src/screens/BT';


export default function App() {

  return (
    <SafeAreaView style={{ overflow: 'scroll' }}>
      <BottomTabs />
      <VideoComponent />
      {/* <BT /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})