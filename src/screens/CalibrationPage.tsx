import { ScrollView, Slider, SliderComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useBLE from '../shared/useBle';
import { atob, btoa } from 'react-native-quick-base64';
import { LowerLimitStore, UpperLimitStore, setLowerLimit, setUpperLimit, Hard_LowerLimitStore, setHard_LowerLimit, Normal_LowerLimitStore, setNormal_LowerLimit, setHard_UpperLimit, setNormal_UpperLimit, Normal_UpperLimitStore, Hard_UpperLimitStore } from '../shared/store';
// const bleManager = new BleManager()
let DATA_SOURCE = [...Array.from(Array(2400).keys())]

const CalibrationPage = ({ navigation }: { navigation: any }) => {
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

  const [ManualUpperLimit, setManualUpperLimit] = useState(0)
  const [ManualLowerLimit, setManualLowerLimit] = useState(0)
  // ----
  const [HardUpperLimit, setHardUpperLimit] = useState("")
  const [HardLowerLimit, setHardLowerLimit] = useState("")
  // ----
  const [NormalUpperLimit, setNormalUpperLimit] = useState("")
  const [NormalLowerLimit, setNormalLowerLimit] = useState("")

  const onPressHardCalibrate = () => {
    // if (DeviceChar.length == 0) {
    //   GetServicesLoaded_Readable()
    // } else {
    //   DeviceChar.filter(it => it.isWritableWithResponse)[0].writeWithResponse(btoa('500'))
    //     .then(value => {
    //       console.log(value);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // }
    if (Number.parseInt(LiveData).toString() !== "NaN") {
      LowerLimitStore.dispatch(setLowerLimit(Number.parseInt(LiveData) - (HardLowerLimit === "" ? 0 : Number.parseInt(HardLowerLimit))))
      console.log(LowerLimitStore.getState().value);
      UpperLimitStore.dispatch(setUpperLimit(Number.parseInt(LiveData) + (HardUpperLimit === "" ? 0 : Number.parseInt(HardUpperLimit))))
      console.log(UpperLimitStore.getState().value);
    }

  }

  const onPressNormalCalibrate = () => {
    if (Number.parseInt(LiveData).toString() !== "NaN") {
      LowerLimitStore.dispatch(setLowerLimit(Number.parseInt(LiveData) - (NormalLowerLimit === "" ? 0 : Number.parseInt(NormalLowerLimit))))
      console.log(LowerLimitStore.getState().value);
      UpperLimitStore.dispatch(setUpperLimit(Number.parseInt(LiveData) + (NormalUpperLimit === "" ? 0 : Number.parseInt(NormalUpperLimit))))
      console.log(UpperLimitStore.getState().value);

      // Normal_LowerLimitStore.dispatch(setNormal_LowerLimit(Number.parseInt(LiveData) - (NormalLowerLimit === "" ? 0 : Number.parseInt(NormalLowerLimit))))
      // Normal_UpperLimitStore.dispatch(setNormal_UpperLimit(Number.parseInt(LiveData) + (NormalUpperLimit === "" ? 0 : Number.parseInt(NormalUpperLimit))))
    }
  }

  const onPressManualCalibrate = () => {
    if (Number.parseInt(LiveData).toString() !== "NaN") {
      LowerLimitStore.dispatch(setLowerLimit(Number.parseInt(LiveData) - ManualLowerLimit))
      console.log(LowerLimitStore.getState().value);
      UpperLimitStore.dispatch(setUpperLimit(Number.parseInt(LiveData) + ManualUpperLimit))
      console.log(UpperLimitStore.getState().value);

      // Hard_LowerLimitStore.dispatch(setHard_LowerLimit(Number.parseInt(LiveData) - (HardLowerLimit === "" ? 0 : Number.parseInt(HardLowerLimit))))
      // Hard_UpperLimitStore.dispatch(setHard_UpperLimit(Number.parseInt(LiveData) + (HardUpperLimit === "" ? 0 : Number.parseInt(HardUpperLimit))))
    }
  }

  useEffect(
    () => {
      if (DeviceChar.length == 0) {
        GetServicesLoaded_Readable()
      } else {
        let interval: number = setInterval(() => {
          DeviceChar.filter(it => it.isReadable)[0].read()
            .then(val => {
              setLiveData(Number.parseInt(atob(val.value ?? "0")).toString())
            })
            .catch(err => {
              setLiveData("Press to Start")

            })
        }, 500);
        return () => clearInterval(interval);
      }
    }, [DeviceChar]
  )


  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.h1}>SENSOR VALUE</Text>
      <Text style={styles.liveDataStyle}>{LiveData}</Text>
      <TouchableOpacity style={styles.liveDataButtonBlack} onPress={async () => {
        GetServicesLoaded_Readable()
      }}>
        <Text style={styles.ButtonText}>SHOW LIVE DATA</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>CALIBRATION SETTINGS</Text>

      <View style={{
        flexDirection: 'column', justifyContent: 'space-between',
        width: '80%', marginTop: 20, marginBottom: 20
      }}>
        <View style={{ width: "100%" }}>
          <Text style={styles.PickerLabel}>Upper Limit {ManualUpperLimit.toFixed(0)}</Text>
          <Slider minimumValue={0} step={1} value={ManualUpperLimit} maximumValue={2400}
            onSlidingComplete={(num) => setManualUpperLimit(num)} />
        </View>
        <View style={{ width: "5%" }} />
        <View style={{ width: "100%", }}>
          <Text style={styles.PickerLabel}>Lower Limit {ManualLowerLimit}</Text>
          <Slider minimumValue={0} step={1} value={ManualLowerLimit} maximumValue={2400}
            onSlidingComplete={(num) => setManualLowerLimit(num)} />

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