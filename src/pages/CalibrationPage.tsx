import { ScrollView, SliderComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Slider from '@react-native-community/slider';
import useBle from '../shared/Ble';
import {
  LimitStore,
  setManualUpperLimit,
  setManualLowerLimit,
  setHardUpperLimit,
  setHardLowerLimit,
  setNormalUpperLimit,
  setNormalLowerLimit,
  setWhichOneToBeFollowed,
  ConnectedDeviceStore
} from '../shared/Store';
import { LimitTypes } from '../shared/LimitTypes';

const CalibrationPage = ({ navigation }: { navigation: any }) => {
  const [FetchingInteval, setFetchingInteval] = useState(0)
  const [Fetching, setFetching] = useState(false)

  LimitStore.subscribe(() => {
    setSWhichOneToBeFollowed(LimitStore.getState().whichOneToBeFollowed)
  })

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
      if (ConnectedDeviceStore.getState().device !== "") {
        onPressStreamButton()
      }
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const [SManualUpperLimit, setSManualUpperLimit] = useState(0)
  const [SManualLowerLimit, setSManualLowerLimit] = useState(0)
  // ----
  const [SHardUpperLimit, setSHardUpperLimit] = useState("")
  const [SHardLowerLimit, setSHardLowerLimit] = useState("")
  // ----
  const [SNormalUpperLimit, setSNormalUpperLimit] = useState("")
  const [SNormalLowerLimit, setSNormalLowerLimit] = useState("")

  const [SWhichOneToBeFollowed, setSWhichOneToBeFollowed] = useState(LimitTypes.NONE)

  LimitStore.subscribe(() => {

  })

  const onPressManualCalibrate = () => {
    let lData = 0
    if (LiveData !== "") {
      lData = Number.parseInt(LiveData)
    }
    LimitStore.dispatch(setManualUpperLimit(lData + SManualUpperLimit))
    LimitStore.dispatch(setManualLowerLimit(lData - SManualLowerLimit))
    LimitStore.dispatch(setWhichOneToBeFollowed(LimitTypes.MANUAL))
  }

  const onPressHardCalibrate = () => {
    let lData = 0
    if (LiveData !== "") {
      lData = Number.parseInt(LiveData)
    }
    if (SHardUpperLimit === "") {
      setSHardUpperLimit("0")
    }
    if (SHardLowerLimit === "") {
      setSHardLowerLimit("0")
    }

    LimitStore.dispatch(setHardUpperLimit(lData + Number.parseInt(SHardUpperLimit)))
    LimitStore.dispatch(setHardLowerLimit(lData - Number.parseInt(SHardLowerLimit)))
    LimitStore.dispatch(setWhichOneToBeFollowed(LimitTypes.HARD))

  }

  const onPressNormalCalibrate = () => {
    let lData = 0
    if (LiveData !== "") {
      lData = Number.parseInt(LiveData)
    }
    if (SNormalUpperLimit === "") {
      setSNormalUpperLimit("0")
    }
    if (SNormalLowerLimit === "") {
      setSNormalLowerLimit("0")
    }
    LimitStore.dispatch(setNormalUpperLimit(lData + Number.parseInt(SNormalUpperLimit)))
    LimitStore.dispatch(setNormalLowerLimit(lData - Number.parseInt(SNormalLowerLimit)))
    LimitStore.dispatch(setWhichOneToBeFollowed(LimitTypes.NORMAL))
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.h1}>SENSOR VALUE</Text>
      <Text style={styles.liveDataStyle}>{LiveData}</Text>
      <TouchableOpacity style={styles.liveDataButtonBlack} onPress={onPressStreamButton}>
        <Text style={styles.ButtonText}>SEE LIVE DATA</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>CALIBRATION SETTINGS</Text>
      <View style={{
        flexDirection: 'column', justifyContent: 'space-between',
        width: '80%', marginTop: 20, marginBottom: 20
      }}>
        <View style={{ width: "100%" }}>
          <Text style={styles.PickerLabel}>Upper Limit {SManualUpperLimit}</Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            step={1}
            maximumValue={1000}
            onValueChange={(num) => setSManualUpperLimit(num)}
          />
        </View>
        <View style={{ width: "5%" }} />
        <View style={{ width: "100%", }}>
          <Text style={styles.PickerLabel}>Lower Limit {SManualLowerLimit}</Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            step={1}
            maximumValue={1000}
            onValueChange={(num) => setSManualLowerLimit(num)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.largeButton} onPress={onPressManualCalibrate}>
        <Text style={styles.ButtonText}>
          Manual Calibrate {SWhichOneToBeFollowed === LimitTypes.MANUAL ? '↩︎' : ''}
        </Text>
      </TouchableOpacity>
      <View style={{ borderWidth: 0.5, width: "100%", borderColor: 'grey', marginTop: 30 }} />
      <View style={{ height: 20 }} />
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Upper Limit: </Text><TextInput style={styles.inputField} keyboardType='number-pad'
          value={SHardUpperLimit}
          onChangeText={(e) => setSHardUpperLimit(e)}
        />
      </View>
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Lower Limit: </Text><TextInput style={styles.inputField} keyboardType='number-pad'
          value={SHardLowerLimit}
          onChangeText={(e) => setSHardLowerLimit(e)}
        />
      </View>
      <TouchableOpacity style={styles.metroButtonBlackExtended} onPress={onPressHardCalibrate}>
        <Text style={styles.ButtonText}>Hard Auto-Calibrate {SWhichOneToBeFollowed === LimitTypes.HARD ? '↩︎' : ''}</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Upper Limit: </Text><TextInput style={styles.inputField} keyboardType='number-pad'
          value={SNormalUpperLimit}
          onChangeText={(e) => setSNormalUpperLimit(e)}
        />
      </View>
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Lower Limit: </Text><TextInput style={styles.inputField} keyboardType='number-pad'
          value={SNormalLowerLimit}
          onChangeText={(e) => setSNormalLowerLimit(e)}
        />
      </View>
      <TouchableOpacity style={styles.metroButtonBlackExtended} onPress={onPressNormalCalibrate}>
        <Text style={styles.ButtonText}>Normal Auto-Calibrate {SWhichOneToBeFollowed === LimitTypes.NORMAL ? '↩︎' : ''}</Text>
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
    marginBottom: 20, borderRadius: 10,
  },
  metroButtonBlackExtended: {
    backgroundColor: 'black', paddingTop: 17, paddingBottom: 17, width: "80%",
    marginTop: 30, borderRadius: 10,
  },
  largeButton: {
    width: '80%', backgroundColor: 'black', borderRadius: 10, paddingTop: 17,
    paddingBottom: 17, marginTop: 20,
  },
  PickerLabel: { textAlign: 'center', fontWeight: 'bold', fontSize: 18, margin: 10 },
  inputWithLabel: {
    flexDirection: 'row', justifyContent: 'flex-start', width: '100%',
    marginTop: 20, marginBottom: 20,
  },
  inputField: { borderBottomColor: 'black', width: 50, borderBottomWidth: 2, fontSize: 20, marginLeft: 20 },
})