import { Alert, Button, Dimensions, NativeAppEventEmitter, NativeModules, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { manager } from '../router/bottomtabs/BottomTabs';
import { Device } from 'react-native-ble-plx';
const CalibrationSettingsPage = ({ navigation }: { navigation: any }) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* <Button
        title='Show'
        onPress={() => {
          // manager.readDescriptorForDevice('00002902-0000-1000-8000-00805f9b34fb')
          manager.discoverAllServicesAndCharacteristicsForDevice('FDBA00A5-2EFC-3C0A-D425-CCD83ADE5A4B')
            .then((val: Device) => {
              console.log(val.serviceData);



              // manager.isDeviceConnected('FDBA00A5-2EFC-3C0A-D425-CCD83ADE5A4B')
              //   .then(val => {
              //     console.log(val);
              //     manager.cancelDeviceConnection('FDBA00A5-2EFC-3C0A-D425-CCD83ADE5A4B')
              //     .then((val) => {
              //       console.log("diconnected ", val.name);
              //     })
              //   })
              //   .catch(err => {
              //     console.log("err");
              //     console.log(err);
              //   })
            }).catch(err => {
              console.log(err);
            })

        }} /> */}

      <Text style={styles.h1}>SENSOR VALUE</Text>
      <Text style={styles.liveDataStyle}>{0}</Text>
      <TouchableOpacity style={styles.liveDataButtonBlack}>
        <Text style={styles.ButtonText}>SHOW LIVE DATA</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>CALIBRATION SETTINGS</Text>

      <View style={{
        flexDirection: 'row', justifyContent: 'space-between',
        width: '80%', marginTop: 20, marginBottom: 20
      }}>
        <View style={{ width: "40%" }}>
          <ScrollPicker
            dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            selectedIndex={0}
            renderItem={(data, index) => {
              return (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>{data}</Text>
              )
            }}
            onValueChange={(data, selectedIndex) => {
              //
            }}
            wrapperHeight={180}
            wrapperColor='rgba(0,0,0,0)'
            itemHeight={60}
            highlightColor='#d8d8d8'
            highlightBorderWidth={2}
          />
          <Text style={styles.PickerLabel}>Upper Limit</Text>
        </View>
        <View style={{ width: "5%" }} />
        <View style={{ width: "40%", }}>
          <ScrollPicker
            dataSource={[1, 2, 3, 4, 5, 6]}
            selectedIndex={0}
            renderItem={(data, index) => {
              return (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>{data}</Text>
              )
            }}
            onValueChange={(data, selectedIndex) => {
              //
            }}
            wrapperHeight={180}
            wrapperColor='rgba(0,0,0,0)'
            itemHeight={60}
            highlightColor='#d8d8d8'
            highlightBorderWidth={2}
          />
          <Text style={styles.PickerLabel}>Lower Limit</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.largeButton}>
        <Text style={styles.ButtonText}>
          Calibrate
        </Text>
      </TouchableOpacity>
      <Text style={styles.h2}>OR</Text>
      <TouchableOpacity style={styles.largeButton}>
        <Text style={styles.ButtonText}>
          Normal Auto-Calibrate
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.largeButton}>
        <Text style={styles.ButtonText}>
          Hard Auto-Calibrate
        </Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Upper Limit: </Text><TextInput style={styles.inputField} />
      </View>
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Lower Limit: </Text><TextInput style={styles.inputField} />
      </View>
      <TouchableOpacity style={styles.metroButtonBlackExtended}>
        <Text style={styles.ButtonText}>Hard Auto-Calibrate</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Upper Limit: </Text><TextInput style={styles.inputField} />
      </View>
      <View style={styles.inputWithLabel}>
        <Text style={{
          fontSize: 20,
          alignSelf: 'flex-start', marginLeft: 20
        }}>Lower Limit: </Text><TextInput style={styles.inputField} />
      </View>
      <TouchableOpacity style={styles.metroButtonBlackExtended}>
        <Text style={styles.ButtonText}>Normal Auto-Calibrate</Text>
      </TouchableOpacity>
      <View style={{ height: 250 }} />
    </ScrollView>
  )
}

export default CalibrationSettingsPage

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
  PickerLabel: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
  inputWithLabel: {
    flexDirection: 'row', justifyContent: 'flex-start', width: '100%',
    marginTop: 20, marginBottom: 20,
  },
  inputField: { borderBottomColor: 'black', width: 50, borderBottomWidth: 2, fontSize: 20, marginLeft: 20 },
})