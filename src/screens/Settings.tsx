import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import RadioButton from '../components/RadioButton';
import { ApplicationMode } from '../shared/ApplicationMode';
import { BleManager, ScanMode } from 'react-native-ble-plx';

const bleManager = new BleManager()


const Settings = ({ navigation }: { navigation: any }) => {
  // const manager = new BleManager();
  const [Mode, setMode] = useState(ApplicationMode.GymMode)
  const [scanAllDevices, setScanAllDevices] = useState(false)

  const onPressDisconnet = () => {
    console.log("Disconnected Pressed");

  }
  const startScanning = () => {
    console.log("Start Scanning Pressed");
    bleManager.startDeviceScan([], { allowDuplicates: false, scanMode: ScanMode.Balanced }, (err, scanned) => {
      if (err) {
        console.log("ERROR Scanning");
      } else if (scanned?.localName != null) {
        // console.log(scanned?.id);
        // console.log(scanned?.name);
        // console.log(scanned?.localName);
        // bleManager.stopDeviceScan()
      }
    })



    bleManager.connectToDevice('FDBA00A5-2EFC-3C0A-D425-CCD83ADE5A4B', {

    })
      .then((device) => {
        console.log("device.id:", device.id);
        console.log("device.name:", device.name);
        console.log("device.serviceData:", device.serviceData);
        console.log("device.rssi:", device.rssi);
        
      })
      .catch(err => {
        console.log("Error connecting");
        console.log(err);

      })


  }

  return (
    <ScrollView>
      <View style={{ paddingTop: 10, alignItems: 'center', height: "100%" }}>

        <View style={{ flexDirection: 'row', width: '90%' }}>
          <Text style={styles.h1Flexed}>Select Mode</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 15, fontWeight: '500' }}>{scanAllDevices ? "Scan all devices" : "BackAware only"}</Text>
            <Switch
              style={{ transform: [{ scale: 0.75 }] }}
              onChange={() => {
                setScanAllDevices(!scanAllDevices)
              }}
              value={scanAllDevices}
              ios_backgroundColor={'rgb(250,20,20)'}
            />
          </View>
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between',
          width: "90%", paddingTop: 15,
        }}>
          <RadioButton
            onPressHandle={() => {
              setMode(ApplicationMode.GymMode)
            }}
            label='Gym Mode'
            active={Mode === ApplicationMode.GymMode}
          />
          <RadioButton
            onPressHandle={() => {
              setMode(ApplicationMode.OfficeMode)
            }}
            label='Office Mode'
            active={Mode === ApplicationMode.OfficeMode}
          />
        </View>

        <View style={[styles.inputWithLabel, { justifyContent: 'center' }]}>
          <TextInput style={styles.inputField}
            placeholder={'If in poor in poor position notify me in '} />
        </View>

        <Text style={styles.h1}>Bluetooth Connection</Text>
        <View style={{
          flexDirection: 'row', width: '90%', paddingBottom: 10,
        }}>
          <TouchableOpacity
            style={styles.metroButtonBlackExtendedSm}
            onPress={() => startScanning()}>
            <Text style={styles.ButtonText}>
              Start Scan
            </Text>
          </TouchableOpacity>
          <View style={{ width: 15 }} />

          <TouchableOpacity
            style={styles.metroButtonBlackExtendedSm}
            onPress={() => onPressDisconnet()}>
            <Text style={styles.ButtonText}>
              Disconnect
            </Text>
          </TouchableOpacity>
        </View>



        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Calibration Settings")
          }} style={[styles.metroButtonBlackExtended, { marginBottom: 15 }]}>
          <Text style={styles.ButtonText}>Calibration Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
  h1: { fontSize: 19, fontWeight: 'bold', alignSelf: 'center', width: "90%", },
  h1Flexed: { fontSize: 19, fontWeight: 'bold', alignSelf: 'center', flex: 1, },
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
  inputWithLabel: {
    flexDirection: 'row', justifyContent: 'flex-start', width: '100%',
    marginTop: 20, marginBottom: 20,
  },
  inputField: { borderBottomColor: 'red', width: "85%", borderBottomWidth: 2, fontSize: 20, padding: 5 },
})