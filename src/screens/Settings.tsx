import { Alert, Button, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import RadioButton from '../components/RadioButton';
import useBLE from '../shared/useBle';
import { Device } from 'react-native-ble-plx';



const Settings = ({ navigation, }: { navigation: any }) => {
  // const manager = new BleManager();
  const [Mode, setMode] = useState("")

  const {
    requstPermissions,
    scanForDevices,
    disconnectDevice,
    ScannedDevices,
    connectToDevice,
    connectedDevice,
    scanAllDevices,
    setScanAllDevices,
  } = useBLE()

  const openModalForPermissions = async () => {
    requstPermissions((result: boolean) => {
      // Alert.alert("Bluetooth Permission was granted  " + result) 
      if (result) {
        scanForDevices()
      }
    })
  }

  return (
    <View style={{ paddingTop: 10, alignItems: 'center', height: "100%" }}>

      <View style={{ flexDirection: 'row', width: '90%' }}>
        <Text style={styles.h1Flexed}>Select Mode</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 15, fontWeight: '500' }}>{scanAllDevices ? "Scan all devices" : "BackAware only"}</Text>
          <Switch
            style={{transform:[{scale:0.75}]}}
            onChange={() => setScanAllDevices(!scanAllDevices)}
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
          onPress={() => {
            openModalForPermissions()
          }}>
          <Text style={styles.ButtonText}>
            Start Scan
          </Text>
        </TouchableOpacity>
        <View style={{ width: 15 }} />

        <TouchableOpacity
          style={styles.metroButtonBlackExtendedSm}
          onPress={() => disconnectDevice(connectedDevice)}>
          <Text style={styles.ButtonText}>
            Disconnect
          </Text>
        </TouchableOpacity>
      </View>



      <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
        <ScrollView contentContainerStyle={{
          alignItems: 'flex-start',
          width: "100%",
          paddingTop: 10,
        }}
          style={{ width: '100%', }}>
          {
            ScannedDevices.filter(device =>
              scanAllDevices ?
                true :
                device.name?.toLowerCase()
                  .includes("BackAware".toLowerCase()) === true ? true : false
            ).map((data: Device, index) => {
              return (
                <TouchableOpacity key={index}
                  style={{ width: '100%', marginBottom: 10 }}
                  onLongPress={() => {

                  }}
                  onPress={() => {
                    connectToDevice(data)
                  }}>
                  <View style={{
                    padding: 5, borderBottomColor: 'gray', borderBottomWidth: 1, flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <View style={{}}>

                      <Text style={{ marginBottom: 5, fontSize: 18, fontWeight: '600' }}>{data.name}</Text>
                      <Text style={{ padding: 0, }}>{data.id}</Text>
                    </View>
                    {
                      data.name === connectedDevice?.name &&
                      <Text style={{ fontSize: 20 }}>✔️</Text>
                    }
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