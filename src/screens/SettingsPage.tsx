import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Device, BleManager as bleManager } from 'react-native-ble-plx';

import { manager, scanningIntervalID, scanDevicesAround } from '../router/bottomtabs/BottomTabs';
import RadioButton from '../components/RadioButton';



const SettingsPage = ({ navigation, }: { navigation: any }) => {
  // const manager = new BleManager();
  const [devicesArr, setDevicesArr] = useState([])
  const [Mode, setMode] = useState("")

  return (
    <View style={{ paddingTop: 10, alignItems: 'center', height: "100%" }}>

      <Text style={styles.h1}>Select Mode</Text>

      <View style={{
        flexDirection: 'row', justifyContent: 'space-between',
        width: "90%", paddingTop: 20, paddingBottom: 20
      }}>
        <RadioButton
          onPressHandle={() => {
            setMode('Gym Mode')
          }}
          label='Gym Mode'
          active={Mode === "Gym Mode"}
        />
        <RadioButton
          onPressHandle={() => {
            setMode('Office Mode')
          }}
          label='Office Mode'
          active={Mode === "Office Mode"}
        />
      </View>

      <Text style={styles.h1}>Bluetooth Connection</Text>
      <View style={{ flexDirection: 'row', width: '90%', }}>
        <TouchableOpacity
          style={styles.metroButtonBlackExtendedSm}
          onPress={() => {
            manager.disable()
            manager.enable()
            clearInterval(scanningIntervalID)
            setDevicesArr([])
            let scanningIntervalIDlocal = setInterval(() => {
              scanDevicesAround(manager, devicesArr, setDevicesArr)
            }, 100)

            setTimeout(() => {
              Alert.alert("Scanning finished")
              clearInterval(scanningIntervalIDlocal)
              manager.stopDeviceScan()
            }, 5000)
          }}>
          <Text style={styles.ButtonText}>
            Start Scan
          </Text>
        </TouchableOpacity>
        <View style={{ width: 15 }} />

        <TouchableOpacity
          style={styles.metroButtonBlackExtendedSm}
          onPress={() => { }}>
          <Text style={styles.ButtonText}>
            Disconnect
          </Text>
        </TouchableOpacity>
      </View>



      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{
          alignItems:'flex-start'
        }}>
          {
            devicesArr.map((data: Device, index) => {
              return (
                <TouchableOpacity key={index}
                  onLongPress={() => {
                    manager.cancelDeviceConnection(data.id)
                      .then((val) => {
                        Alert.alert("diconnected " + val.name);
                      })
                  }}
                  onPress={() => {
                    manager.connectToDevice(data.id, {
                      autoConnect: true
                    })
                      .then((dev) => {
                        Alert.alert("Connected " + dev.name);
                        clearInterval(scanningIntervalID)
                        manager.stopDeviceScan()
                      })
                      .catch(err => {
                        console.log(err);
                        clearInterval(scanningIntervalID)
                        manager.stopDeviceScan()
                      })
                  }}>
                  <View style={{ padding: 5, borderBottomColor: 'gray', borderBottomWidth: 1, width: '80%' }}>
                    <Text style={{ padding: 5 }}>{data.id}</Text>
                    <Text style={{ padding: 5 }}>{data.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>



      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Calibration Settings")
        }} style={[styles.metroButtonBlackExtended, { marginBottom: 15 }]}>
        <Text style={styles.ButtonText}>Calibration Settings</Text>
      </TouchableOpacity>




      {/* <Button
        title='Show'
        onPress={() => {
          manager.discoverAllServicesAndCharacteristicsForDevice('FDBA00A5-2EFC-3C0A-D425-CCD83ADE5A4B')
            .then(val => {
              console.log(val);
            }).catch(err => {
              console.log(err);

            })

          manager.isDeviceConnected('FDBA00A5-2EFC-3C0A-D425-CCD83ADE5A4B')
            .then(val => {
              console.log(val);

            })
            .catch(err => {
              console.log("err");

              console.log(err);
            })


        }} /> */}
    </View>
  )
}

export default SettingsPage

const styles = StyleSheet.create({
  h1: { fontSize: 19, fontWeight: 'bold', alignSelf: 'center', width: "90%", },
  h2: { fontSize: 20, fontWeight: '500', alignSelf: 'center', color: 'blue' },
  metroButtonBlackExtended: {
    backgroundColor: 'black', paddingTop: 10, paddingBottom: 10, width: "90%",
    marginTop: 30, borderRadius: 5,
  },
  metroButtonBlackExtendedSm: {
    backgroundColor: 'black', paddingTop: 10, paddingBottom: 10, flex: 1,
    marginTop: 30, borderRadius: 5, flexDirection: 'row', justifyContent: 'center'
  },
  ButtonText: { color: 'white', fontWeight: '600', fontSize: 18, textAlign: 'center' },
})