import { SafeAreaView, StyleSheet, Text, View, Dimensions, ViewComponent } from 'react-native'
import React, { useState } from 'react'
import { BottomTabs } from './src/router/bottomtabs/BottomTabs';
import VideoComponent from './src/components/VideoComponent';
import { VIDEOSTATUS } from './src/shared/VIDEOSTATUS';
import usePIP from './src/shared/usePIP';


const App = () => {
  const {
    PipEnabled,
    setPipEnabled
  } = usePIP()
  return (
    <SafeAreaView style={{ overflow: 'scroll' }}>
      <BottomTabs/>
      <VideoComponent
        // PipEnabled={PipEnabled}
        // setPipEnabled={setPipEnabled}
      />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})