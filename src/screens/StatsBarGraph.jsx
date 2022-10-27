import { View, Text, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const StatsBarGraph = () => {
  return (
    <View style={{ height: Dimensions.get('screen').height }}>
      <View style={{
        flex: 1, backgroundColor: 'black', borderRadius: 10, margin: 10, shadowOffset: { height: 0, width: 0 },
        shadowColor: 'rgb(100,100,100)', shadowOpacity: 1, shadowRadius: 10
      }}>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
        <TextInput style={{
          flex: 1,
          margin: 10, backgroundColor: 'rgb(200,200,200)',
          fontSize: 20, padding: 10, borderRadius: 10
        }} placeholder="Enter Test Name" />
        <TouchableOpacity style={{
          flex: 0.2, margin: 10, backgroundColor: 'black',
          padding: 10, borderRadius: 10, alignItems: 'center',
        }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Go</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 10,marginRight:10 }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Hard Calibrate</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Normal Calibrate</Text></TouchableOpacity>
        </View>
      </View>
      <View style={{ marginLeft: 10,marginRight:10 }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Stop</Text></TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2 }}>
      </View>
    </View>
  )
}

export default StatsBarGraph