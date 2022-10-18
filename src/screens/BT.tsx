import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BleManager, Device } from 'react-native-ble-plx'
import { atob } from 'react-native-quick-base64';


const bleManager = new BleManager({});

const BT = () => {
    const [Devices, setDevices] = useState<Device[]>([])

    const filterDevices = (devices: Device[]) => {
        let filtered: Device[] = []
        for (let index = 0; index < devices.length; index++) {
            for (let s_index = index + 1; s_index < devices.length; s_index++) {
                if (devices[index].id !== devices[s_index].id) {
                    if (filtered.filter(item => item.id === devices[index].id).length === 0)
                        filtered.push(devices[index])
                }
            }
        }
        return filtered
    }

    const onPressDiconnect = () => {
        setDevices([])
    }

    const onPressScan = () => {
        console.log("Started Scanning");

        bleManager.startDeviceScan([], { allowDuplicates: false },
            (err, devices) => {
                if (devices !== null) {
                    if (devices.name !== null) {
                        Devices.push(devices)
                        setDevices([...filterDevices(Devices)])
                    }
                }
            }
        )
    }

    const onConnectWith = (device: Device) => {
        bleManager.connectToDevice(device.id.toLowerCase())
            .then(res => {
                res.discoverAllServicesAndCharacteristics()
                    .then(res => {
                        res.connect({ autoConnect: false })
                            .then(res => {
                                res.services().then(data => {
                                    // console.log("services");
                                    // console.log(data[0]);
                                    data[0].characteristics().then(char => {
                                        // console.log("Characteristics");
                                        // console.log(char.filter(c => c.isReadable === true)[0]);  

                                        char.filter(c => c.isReadable === true)[0].read()
                                            .then(value => {
                                                console.log("Read value is");
                                                console.log(atob(value.value ?? ""));
                                                
                                            })

                                    })
                                    // console.log("Connected");
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })

            })
            .catch(err => {
                console.log(err);
                console.log("Err");

            })
    }


    return (
        <View style={{ justifyContent: 'flex-end', height: '100%' }}>
            <ScrollView>
                <View style={{ height: 50 }} />
                {
                    Devices.map((device: Device, index) => (
                        <TouchableOpacity
                            onPress={() => onConnectWith(device)}
                            style={{ margin: 10, borderWidth: 1, borderColor: 'black', padding: 10 }} key={index}>
                            <Text>{device.name}</Text>
                            <Text>{device.id}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>

            <View style={{ backgroundColor: 'black', margin: 5, padding: 10 }}>
                <Button
                    color={'white'}
                    onPress={onPressScan}
                    title="Scan" />
            </View>
            <View style={{ backgroundColor: 'black', margin: 5, padding: 10 }}>
                <Button
                    color={'white'}
                    onPress={onPressDiconnect}
                    title="Disconnect" />
            </View>
        </View>
    )
}

export default BT

const styles = StyleSheet.create({})