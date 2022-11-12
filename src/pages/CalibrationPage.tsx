import { ScrollView, SliderComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Slider from '@react-native-community/slider';
import useBle from '../shared/Ble';

const CalibrationPage = ({ navigation }: { navigation: any }) => {
  const [FetchingInteval, setFetchingInteval] = useState(0)
  const [Fetching, setFetching] = useState(false)

  const {
    GetLiveData_Android,
    LiveData,
    setLiveData,
  } = useBle()

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

  const [ManualUpperLimit, setManualUpperLimit] = useState(0)
  const [ManualLowerLimit, setManualLowerLimit] = useState(0)
  // ----
  const [HardUpperLimit, setHardUpperLimit] = useState("")
  const [HardLowerLimit, setHardLowerLimit] = useState("")
  // ----
  const [NormalUpperLimit, setNormalUpperLimit] = useState("")
  const [NormalLowerLimit, setNormalLowerLimit] = useState("")

  const onPressHardCalibrate = () => {

  }

  const onPressNormalCalibrate = () => {

  }

  const onPressManualCalibrate = () => {

  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.h1}>SENSOR VALUE</Text>
      <Text style={styles.liveDataStyle}>{LiveData}</Text>
      <TouchableOpacity style={styles.liveDataButtonBlack} onPress={ToggleLiveDataStreaming}>
        <Text style={styles.ButtonText}>{Fetching ? 'STOP' : 'START'} LIVE DATA</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>CALIBRATION SETTINGS</Text>

      <View style={{
        flexDirection: 'column', justifyContent: 'space-between',
        width: '80%', marginTop: 20, marginBottom: 20
      }}>
        <View style={{ width: "100%" }}>
          <Text style={styles.PickerLabel}>Upper Limit {ManualUpperLimit.toFixed(0)}</Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            step={1}
            maximumValue={3000}
            onValueChange={(num) => setManualUpperLimit(num)}
          />
        </View>
        <View style={{ width: "5%" }} />
        <View style={{ width: "100%", }}>
          <Text style={styles.PickerLabel}>Lower Limit {ManualLowerLimit}</Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            step={1}
            maximumValue={3000}
            onValueChange={(num) => setManualLowerLimit(num)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.largeButton} onPress={onPressManualCalibrate}>
        <Text style={styles.ButtonText}>
          Calibrate
        </Text>
      </TouchableOpacity>
      <View style={{ borderWidth: 0.5, width: "100%", borderColor: 'grey', marginTop: 30 }} />
      <View style={{ height: 20 }} />
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Upper Limit: </Text><TextInput style={styles.inputField} keyboardType='number-pad' value={HardUpperLimit} onChangeText={(e) => setHardUpperLimit(e)} />
      </View>
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Lower Limit: </Text><TextInput style={styles.inputField} keyboardType='number-pad' value={HardLowerLimit} onChangeText={(e) => setHardLowerLimit(e)} />
      </View>
      <TouchableOpacity style={styles.metroButtonBlackExtended} onPress={onPressHardCalibrate}>
        <Text style={styles.ButtonText}>Hard Auto-Calibrate</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Upper Limit: </Text><TextInput style={styles.inputField} keyboardType='number-pad' value={NormalUpperLimit} onChangeText={(e) => setNormalUpperLimit(e)} />
      </View>
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Lower Limit: </Text><TextInput style={styles.inputField} keyboardType='number-pad' value={NormalLowerLimit} onChangeText={(e) => setNormalLowerLimit(e)} />
      </View>
      <TouchableOpacity style={styles.metroButtonBlackExtended} onPress={onPressNormalCalibrate}>
        <Text style={styles.ButtonText}>Normal Auto-Calibrate</Text>
      </TouchableOpacity>
      <View style={{ height: 250 }} />
    </ScrollView>
  )
}

export default CalibrationPage

const styles = StyleSheet.create({
  h1: { fontSize: 20, fontWeight: '500' },
  h2: { fontSize: 16, marginTop: 20, },
  contentContainer: { alignItems: 'center', paddingTop: 25 },
  ButtonText: { color: 'white', fontWeight: '600', fontSize: 15, textAlign: 'center' },
  liveDataStyle: { fontSize: 30, marginTop: 20, marginBottom: 20, fontWeight: 'bold', },
  liveDataButtonBlack: {
    backgroundColor: 'black', paddingTop: 17, paddingBottom: 17,
    paddingLeft: 25, paddingRight: 25,
    marginBottom: 20
  },
  metroButtonBlackExtended: {
    backgroundColor: 'black', paddingTop: 17, paddingBottom: 17, width: "80%",
    marginTop: 30,
  },
  largeButton: {
    width: '80%', backgroundColor: 'black', borderRadius: 5, paddingTop: 17,
    paddingBottom: 17, marginTop: 20
  },
  PickerLabel: { textAlign: 'center', fontWeight: 'bold', fontSize: 18, margin: 10 },
  inputWithLabel: {
    flexDirection: 'row', justifyContent: 'flex-start', width: '100%',
    marginTop: 20, marginBottom: 20,
  },
  inputField: { borderBottomColor: 'black', width: 50, borderBottomWidth: 2, fontSize: 20, marginLeft: 20 },
})