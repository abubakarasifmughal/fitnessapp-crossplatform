import { SafeAreaView, StyleSheet, Text, View, Dimensions, ViewComponent } from 'react-native'
import React, { useState,createContext } from 'react'
import { BottomTabs } from './src/router/bottomtabs/BottomTabs';
import VideoComponent from './src/components/VideoComponent';
import { VIDEOSTATUS } from './src/shared/VIDEOSTATUS';


export default function App() {

  return (
    <SafeAreaView style={{ overflow: 'scroll' }}>
      <BottomTabs />
      <VideoComponent />
    </SafeAreaView>
  )
}

// export default App

const styles = StyleSheet.create({})