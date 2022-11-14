import { BleManager, Characteristic, Device, Service } from 'react-native-ble-plx';
import { RESULTS, requestMultiple, PERMISSIONS } from 'react-native-permissions';
import base64 from 'react-native-base64'
import {
    clearConnectedDeviceInStore, ConnectedDeviceStore, DeviceServicesStore,
    DeviceCharacteristicsStore, setConnectedDeviceInStore,
    setDeviceCharacteristics, setDeviceServices
} from '../shared/Store';
import { Alert, LogBox, PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const bleManager = new BleManager();

export default function useBle() {
    const [ScannedDevices, setScannedDevices] = useState<(Device | undefined)[]>([])
    const [LiveData, setLiveData] = useState("0")

    const isEnabled = () => {
        return bleManager.state();
    }

    const StopScan = () => {
        bleManager.stopDeviceScan()
        console.log("Scanning Stopped");
    }

    const requestPermissions = async (callback: (granted: boolean) => void) => {
        // Any additional permissions I want in the future will be added here, Dependency Already Added.

        return callback(true)
    }

    const ClearBluetoothData = () => {
        clearConnectedDeviceInStore()
        setScannedDevices([])
        console.log("Diconnecting Everywhere");

    }

    const removeDuplicatesFromScannedDevices = (scannedDevices: Device[]) => {
        return [...new Set(scannedDevices.map(d => d.id))]
            .map(id => scannedDevices.find(d => d.id === id))
    }

    const StartScan = () => {

        bleManager.state()
            .then(val => {
                if (val === "PoweredOff") {
                    Alert.alert("Turn Bluetooth On", "Please turn on bluetooth in order to scan backaware unit")
                    return
                }
            }).catch(val => {
                return
            })

        let scannedDevicesWithDuplicates: Device[] = [];
        const ScanTime = 2000;
        requestPermissions((result) => {
            console.log("Permissions", result);
            if (result) {
                isEnabled()
                    .then(res => {
                        console.log("Scanning Initiating", res);
                        bleManager.startDeviceScan([], { allowDuplicates: false }, (err, devices) => {
                            if (devices?.localName) {
                                console.log("Devices", devices?.localName);
                                scannedDevicesWithDuplicates.push(devices)
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                console.log("Permissions not granted");
            }
        })
        setTimeout(() => {
            setScannedDevices([...removeDuplicatesFromScannedDevices(scannedDevicesWithDuplicates)])
            StopScan()
        }, ScanTime);
    }

    const ConnectToDevice = (device: Device) => {

        bleManager.connectToDevice(device.id, {
            autoConnect: true, timeout: 2000, refreshGatt: 'OnConnected'
        })
            .then(res => {
                ConnectedDeviceStore.dispatch(setConnectedDeviceInStore(JSON.stringify(res)))
                console.log("Device info Stored in Ble");
                res.discoverAllServicesAndCharacteristics()
                    .then(res => {
                        res.services()
                            .then(data => {
                                DeviceServicesStore.dispatch(setDeviceServices(JSON.stringify(data)))
                                console.log("Device services Stored in Ble");
                                data[0].characteristics()
                                    .then(char => {
                                        DeviceCharacteristicsStore.dispatch(setDeviceCharacteristics(JSON.stringify(char)))
                                        console.log("Device characteristics Stored in Ble");
                                        console.log("Loaded");
                                    })
                                    .catch(err => {
                                        // console.log(err);
                                        // ConnectedDeviceStore.dispatch(clearConnectedDeviceInStore())
                                    })
                            })
                            .catch(err => {
                                // console.log(err);
                                // ConnectedDeviceStore.dispatch(clearConnectedDeviceInStore())
                            })
                    })
                    .catch(err => {
                        // console.log(err);
                        // ConnectedDeviceStore.dispatch(clearConnectedDeviceInStore())
                    })
            })
            .catch(err => {
                // console.log(err)
                // ConnectedDeviceStore.dispatch(clearConnectedDeviceInStore())
            })
    }

    const GetLiveData = () => {
        console.log("Pressed");

        if (ConnectedDeviceStore.getState().device !== "") {
            let device: Device = JSON.parse(ConnectedDeviceStore.getState().device) as Device
            console.log("Device mil gai");
            if (DeviceServicesStore.getState().services !== "") {
                let services: Service[] = JSON.parse(DeviceServicesStore.getState().services) as Service[]
                console.log("Service mil gai");
                if (DeviceCharacteristicsStore.getState().characteristics !== "") {
                    let characteristics: Characteristic[] = JSON.parse(DeviceCharacteristicsStore.getState().characteristics) as Characteristic[]
                    console.log("Chars mil gai");

                    // Piece of code works on the iPhone but doesnt on Android
                    characteristics.forEach((char, i) => {
                        if (char.isReadable) {
                            console.log("Readable found");
                            bleManager.readCharacteristicForDevice(device.id, services[0].uuid, char.uuid)
                                .then(value => {
                                    console.log(base64.decode(value.value ?? "MC4wMDAwMA=="));
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        }
                    })

                }
            }
        }

    }

    const GetLiveData_Android = async (callback: (value: string) => void) => {
        let device: Device = JSON.parse(ConnectedDeviceStore.getState().device) as Device
        bleManager.discoverAllServicesAndCharacteristicsForDevice(device.id, 'scanAnd')
            .then(data => {
                bleManager.servicesForDevice(data.id)
                    .then((service: Service[]) => {
                        service.forEach(service => {
                            bleManager.characteristicsForDevice(data.id, service.uuid)
                                .then((chars: Characteristic[]) => {
                                    chars.forEach(char => {
                                        if (char.isReadable) {
                                            char.read()
                                                .then(value => {
                                                    let numRead = Number.parseInt(base64.decode(value.value ?? ""))
                                                    if (numRead.toString() !== 'NaN') {
                                                        return callback(numRead.toString())
                                                    }
                                                })
                                                .catch(err => {
                                                })
                                        }

                                    })
                                })
                                .catch(err => {

                                })
                        })
                    })
                    .catch(err => {

                    })
            })
            .catch(err => {

            })



    }

    return {
        StartScan,
        StopScan,
        ScannedDevices,
        ClearBluetoothData,
        ConnectToDevice,
        LiveData,
        setLiveData,
        GetLiveData_Android,
    }
}