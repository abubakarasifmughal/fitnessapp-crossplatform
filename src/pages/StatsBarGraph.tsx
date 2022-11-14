import { View, Text, Dimensions, Touchable, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { LineChart } from 'react-native-chart-kit'
import useBle from '../shared/Ble';
import { ConnectedDeviceStore, LimitStore,setWhichOneToBeFollowed } from '../shared/Store';
import { LimitTypes } from '../shared/LimitTypes';

const NUM_OF_POINTS = 10;
const StatsBarGraph = () => {
  const [DataLine, setDataLine] = useState([0])

  const [UpperLimit, setUpperLimit] = useState(LimitStore.getState().manualUpperLimit)
  const [LowerLimit, setLowerLimit] = useState(LimitStore.getState().manualLowerLimit)
  const [Fetching, setFetching] = useState(false)

  const {
    GetLiveData_Android,
    LiveData,
    setLiveData,
  } = useBle()
  const onPressStreamButton = () => {
    GetLiveData_Android((value) => {
      setLiveData(value)
    })
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if(ConnectedDeviceStore.getState().device !== ""){
        onPressStreamButton()
      }
    }, 500)
    return () => clearInterval(interval)
  }, [])


  LimitStore.subscribe(() => {
    if (LimitStore.getState().whichOneToBeFollowed === LimitTypes.NORMAL) {        
        setUpperLimit(LimitStore.getState().normalUpperLimit ?? 0)
        setLowerLimit(LimitStore.getState().normalLowerLimit ?? 0)
    }
    if (LimitStore.getState().whichOneToBeFollowed === LimitTypes.HARD) {
        setUpperLimit(LimitStore.getState().hardUpperLimit ?? 0)
        setLowerLimit(LimitStore.getState().hardLowerLimit ?? 0)
    }
  })

  return (
    <ScrollView style={{ height: Dimensions.get('screen').height, }}>

      <View style={{ alignItems: 'center', paddingTop: 0, marginBottom: 20 }}>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                color: () => 'transparent',
                data: [...new Array(1).fill(Math.max(...DataLine) + 100)]
              },
              {
                color: () => 'transparent',
                data: [...new Array(1).fill(Math.min(...DataLine) - 100)]
              },
              {
                color: () => 'transparent',
                data: [...new Array(NUM_OF_POINTS).fill(
                  UpperLimit + 100
                )]
              },
              {
                color: () => 'transparent',
                data: [...new Array(NUM_OF_POINTS).fill(
                  LowerLimit - 100
                )]
              },
              {
                color: () => 'blue',
                data: [...new Array(NUM_OF_POINTS).fill(
                  UpperLimit
                )]
              },
              {
                color: () => 'blue',
                data: [...new Array(NUM_OF_POINTS).fill(
                  LowerLimit
                )]
              },
              {
                color: () => 'red',
                strokeWidth: 2,
                data: DataLine ?? [0]
              },

            ]
          }}
          width={Dimensions.get('window').width}
          height={350}
          withDots={false}
          chartConfig={{
            backgroundGradientFrom: 'black',
            backgroundGradientTo: 'black',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          bezier
        />
      </View>
      <Text style={{ textAlign: 'center', marginBottom: 10 }}>Streaming Value {"LiveData"} {LimitStore.getState().whichOneToBeFollowed}</Text>
      <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
        <TextInput style={{
          flex: 2,
          margin: 10, backgroundColor: 'rgb(200,200,200)',
          fontSize: 20, padding: 10, borderRadius: 10
        }} placeholder="Enter Test Name" />
        <TouchableOpacity
          style={{
            flex: 1, margin: 10, backgroundColor: 'black',
            padding: 10, borderRadius: 10, alignItems: 'center',
          }} onPress={() => {
            onPressStreamButton()
          }}>
          <Text style={{ fontSize: 20, color: 'white', }}>Start</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }} onPress={() => {
            LimitStore.dispatch(setWhichOneToBeFollowed(LimitTypes.HARD))
          }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Hard Calibrate</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }} onPress={() => {
            LimitStore.dispatch(setWhichOneToBeFollowed(LimitTypes.NORMAL))
          }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }} >Normal Calibrate</Text></TouchableOpacity>
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