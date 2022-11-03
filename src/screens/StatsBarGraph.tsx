import { View, Text, Dimensions, Touchable, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { LineChart } from 'react-native-chart-kit'
import useBLE from '../shared/useBle'
import { atob } from 'react-native-quick-base64'
import { Hard_LowerLimitStore, Hard_UpperLimitStore, LowerLimitStore, Normal_LowerLimitStore, Normal_UpperLimitStore, setLowerLimit, setUpperLimit, UpperLimitStore } from '../shared/store'

const NUM_OF_POINTS = 10;
const REFRESH_INTERVAL = 100;
const StatsBarGraph = () => {
  const [DataLine, setDataLine] = useState([0])

  const {
    ConnectedDevice,
    setConnectedDevice,
    DeviceChar,
    setDeviceChar,
    LiveData,
    setLiveData,
    Loaded,
    setLoaded,
    GetServicesLoaded_Readable
  } = useBLE()

  useEffect(
    () => {
      if (DeviceChar.length == 0) {
        GetServicesLoaded_Readable()
      } else {
        let interval: number = setInterval(() => {
          DeviceChar.filter(it => it.isReadable)[0].read()
            .then(val => {
              setLiveData(Number.parseInt(atob(val.value ?? "0")).toString())
              if (DataLine.length) {
                if (Number.parseInt(LiveData).toString() !== "NaN") {
                  if (DataLine.length > NUM_OF_POINTS) {
                    DataLine.shift()
                    setDataLine([...DataLine])
                  }
                  setDataLine([...DataLine, Number.parseInt(LiveData)])

                }
              }
            })
            .catch(err => {
              setLiveData("Press to Start")
            })
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
      }
    }, [DeviceChar, DataLine, LiveData]
  )

  return (
    <ScrollView style={{ height: Dimensions.get('screen').height, }}>
      {/* <Text>{LiveData} </Text> */}
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
                color: () => 'blue',
                data: [...new Array(10).fill(UpperLimitStore.getState().value + 10)]
              },
              {
                color: () => 'blue',
                data: [...new Array(10).fill(LowerLimitStore.getState().value - 10)]
              },
              {
                color: () => 'red',
                strokeWidth: 1,
                data: DataLine ?? [0]
              },
              {
                color: () => 'transparent',
                data: [...new Array(1).fill(Math.min(...DataLine) - 100)]
              },
            ]
          }}
          width={Dimensions.get('window').width} // from react-native
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
      {/* </View> */}
      <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
        <TextInput style={{
          flex: 1,
          margin: 10, backgroundColor: 'rgb(200,200,200)',
          fontSize: 20, padding: 10, borderRadius: 10
        }} placeholder="Enter Test Name" />
        <TouchableOpacity
          onPress={() => {
            GetServicesLoaded_Readable()
            // setDataLine([...DataLine, Number.parseInt(LiveData)])
            // if (DataLine.length >= 10) {
            //   DataLine.shift()
            //   setDataLine([...DataLine])
            // }

          }}
          style={{
            flex: 0.2, margin: 10, backgroundColor: 'black',
            padding: 10, borderRadius: 10, alignItems: 'center',
          }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Start</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }} onPress={() => {
              LowerLimitStore.dispatch(setLowerLimit(Hard_LowerLimitStore.getState().value))
              UpperLimitStore.dispatch(setUpperLimit(Hard_UpperLimitStore.getState().value))
            }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Hard Calibrate</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }} onPress={() => {
            LowerLimitStore.dispatch(setLowerLimit(Normal_LowerLimitStore.getState().value))
            UpperLimitStore.dispatch(setUpperLimit(Normal_UpperLimitStore.getState().value))
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