import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import RadioButton from '../components/RadioButton';



const Settings = ({ navigation, }: { navigation: any }) => {
  // const manager = new BleManager();
  const [devicesArr, setDevicesArr] = useState([])
  const [Mode, setMode] = useState("")
  const [ConnectedDevice, setConnectedDevice] = useState("")
  const [ConnectedDeviceID, setConnectedDeviceID] = useState("")

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

      <View style={[styles.inputWithLabel,{justifyContent:'center'}]}>
        <TextInput style={styles.inputField} 
        placeholder={'If in poor in poor position notify me in '}/>
      </View>

      <Text style={styles.h1}>Bluetooth Connection</Text>
      <View style={{
        flexDirection: 'row', width: '90%', paddingBottom: 10,
      }}>
        <TouchableOpacity
          style={styles.metroButtonBlackExtendedSm}
          onPress={() => {

          }}>
          <Text style={styles.ButtonText}>
            Start Scan
          </Text>
        </TouchableOpacity>
        <View style={{ width: 15 }} />

        <TouchableOpacity
          style={styles.metroButtonBlackExtendedSm}
          onPress={() => {

          }}>
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
            devicesArr.map((data: any, index) => {
              return (
                <TouchableOpacity key={index}
                  style={{ width: '100%', marginBottom: 10 }}
                  onLongPress={() => {

                  }}
                  onPress={() => {

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
                      data.name === ConnectedDevice &&
                      <Text>✅</Text>
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
  inputField: { borderBottomColor: 'red', width: "85%",borderBottomWidth: 2,fontSize:20,padding:5 },
})