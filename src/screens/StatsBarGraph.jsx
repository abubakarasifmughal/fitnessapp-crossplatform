import { View, Text, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { LineChart } from 'react-native-chart-kit'

const StatsBarGraph = () => {
  return (
    <ScrollView style={{ height: Dimensions.get('screen').height }}>
      {/* <View style={{
        height: 400, backgroundColor: 'black', borderRadius: 10, margin: 10, shadowOffset: { height: 0, width: 0 },
        shadowColor: 'rgb(100,100,100)', shadowOpacity: 1, shadowRadius: 10
      }}> */}
      <View style={{ alignItems: 'center', paddingTop: 20, marginBottom: 20 }}>
        <LineChart
        
          data={{
            labels: [],
            datasets: [
              {
                color: () => 'red',
                data: [
                  20,20,20,20,20,20,20,20,20,
                ]
              },
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ]
              },
              {
                color: () => 'red',
                data: [
                  50,50,50,50,50,50,50,50,50,
                ]
              },
              
            ]
          }}

          width={Dimensions.get('window').width - 40} // from react-native
          height={320}
          chartConfig={{
            backgroundGradientFrom: 'black',
            backgroundGradientTo: 'rgb(100,0,0)',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          bezier
          style={{
            borderRadius: 16
          }}
        />
      </View>
      {/* </View> */}
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
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Hard Calibrate</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Normal Calibrate</Text></TouchableOpacity>
        </View>
      </View>
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Stop</Text></TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2 }}>
      </View>
    </ScrollView>
  )
}

export default StatsBarGraph