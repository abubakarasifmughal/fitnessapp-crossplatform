import { View, Text, Dimensions, Touchable, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { LineChart } from 'react-native-chart-kit'
import useBle from '../shared/Ble';

const NUM_OF_POINTS = 10;
const StatsBarGraph = () => {
  const [DataLine, setDataLine] = useState([0])

  const {
    GetLiveData_Android,
    LiveData,
    setLiveData,
  } = useBle()


  const [FetchingInteval, setFetchingInteval] = useState(0)
  const [Fetching, setFetching] = useState(false)


  const ToggleLiveDataStreaming = () => {
    setFetching(!Fetching)
    if (Fetching) {
      clearInterval(FetchingInteval)
      setLiveData("Press to Start")
    } else {
      setFetchingInteval(setInterval(() => {
        GetLiveData_Android((value) => {
          setLiveData(value)
        })
      }, 500))
    }
  }

  useEffect(() => {
    ToggleLiveDataStreaming()
  }, [])

  useEffect(() => {
    if (parseInt(LiveData).toString() !== 'NaN') {
      if (DataLine.length > NUM_OF_POINTS) {
        DataLine.shift()
        setDataLine([...DataLine])
      }
      setDataLine([...DataLine, Number.parseInt(LiveData)])
    }

  }, [LiveData])


  return (
    <ScrollView style={{ height: Dimensions.get('screen').height, }}>
      <Text>{LiveData} </Text>
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
              // {
              //   color: () => 'blue',
              //   data: [...new Array(10).fill(20 + 10)]
              // },
              // {
              //   color: () => 'blue',
              //   data: [...new Array(10).fill(20 - 10)]
              // },
              {
                color: () => 'orange',
                strokeWidth: 2,
                data: DataLine ?? [0]
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
          flex: 2,
          margin: 10, backgroundColor: 'rgb(200,200,200)',
          fontSize: 20, padding: 10, borderRadius: 10
        }} placeholder="Enter Test Name" />
        <TouchableOpacity
          onPress={() => {
            if (!Fetching) {
              ToggleLiveDataStreaming()
              console.log("Started");
              
            }
          }}
          style={{
            flex: 1, margin: 10, backgroundColor: 'black',
            padding: 10, borderRadius: 10, alignItems: 'center',
          }}>
          <Text style={{ fontSize: 20, color: 'white', }}>Start</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }} onPress={() => {
            // LowerLimitStore.dispatch(setLowerLimit(Hard_LowerLimitStore.getState().value))
            // UpperLimitStore.dispatch(setUpperLimit(Hard_UpperLimitStore.getState().value))
          }}>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Hard Calibrate</Text></TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, flex: 1, margin: 10 }} onPress={() => {
            // LowerLimitStore.dispatch(setLowerLimit(Normal_LowerLimitStore.getState().value))
            // UpperLimitStore.dispatch(setUpperLimit(Normal_UpperLimitStore.getState().value))
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