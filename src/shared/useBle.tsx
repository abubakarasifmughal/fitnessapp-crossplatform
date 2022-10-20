import React, { useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native"
import { BleManager, Characteristic, Device } from "react-native-ble-plx"
import { atob } from "react-native-quick-base64";
import { ConnectedDeviceStore, setConnectedDeviceAtStore } from '../shared/store';

type PermissionCallback = (result: boolean) => void

interface BluetoothLowEnergyApi {
    requstPermissions(callback: PermissionCallback): Promise<void>;
    scanForDevices(): void;
    disconnectDevice(device: Device): void;
    connectToDevice(device: Device): Promise<void>;
    ScannedDevices: Device[];
    // connectedDevice: Device | null;
    scanAllDevices: boolean;
    setScanAllDevices: React.Dispatch<React.SetStateAction<boolean>>;
    isScanningStatus: boolean;
    // Live Data
    ConnectedDevice: Device | undefined,
    setConnectedDevice: React.Dispatch<React.SetStateAction<Device | undefined>>,
    LiveData: string,
    setLiveData: React.Dispatch<React.SetStateAction<string>>,
    DeviceChar: Characteristic[],
    setDeviceChar: React.Dispatch<React.SetStateAction<Characteristic[]>>,
    Loaded: boolean,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    GetServicesLoaded_Readable: () => void
}

const bleManager = new BleManager();

export default function useBLE(): BluetoothLowEnergyApi {

    const [ScannedDevices, setScannedDevices] = useState<Device[]>([]);
    // const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)
    const [scanAllDevices, setScanAllDevices] = useState(false)
    const [isScanningStatus, setIsScanningStatus] = useState(false)
    // todo will attach to the datastream later
    const [flexValue, setFlexValue] = useState(0.0)

    const [ConnectedDevice, setConnectedDevice] = useState<Device | undefined>(undefined)
    const [LiveData, setLiveData] = useState("Press to Start")
    const [DeviceChar, setDeviceChar] = useState<Characteristic[]>([])
    const [Loaded, setLoaded] = useState(false)

    const requstPermissions = async (callback: PermissionCallback) => {
        if (Platform.OS === 'android') {
            const grantedStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: "Location Permissions",
                message: "BackAware requires to use Fine Location in order to work",
                buttonPositive: "Grant!",
                buttonNegative: "Cancel",
                buttonNeutral: "Maybe Later"
            })

            return callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED)
        } else {
            return callback(true)
        }
    }

    const isDuplicateDevice = (devices: Device[], newDevice: Device) =>
        devices.findIndex(deviceFromArray => deviceFromArray.id === newDevice.id) > -1

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

    const scanForDevices = () => {
        if (isScanningStatus) {
            setIsScanningStatus(false)
            bleManager.stopDeviceScan()
        } else {
            bleManager.startDeviceScan([], { allowDuplicates: false }, (error, scanResponse) => {
                if (error) {
                    Alert.alert("Counldn't scan devices")
                } else {
                    setIsScanningStatus(true)
                    if (scanResponse !== null) {
                        if (scanResponse.name !== null) {
                            ScannedDevices.push(scanResponse)
                            setScannedDevices([...filterDevices(ScannedDevices)])
                        }
                    }
                }
            })
        }
    }

    const connectToDevice = async (device: Device) => {
        device.connect()
            .then((connectedDevice) => {
                ConnectedDeviceStore.dispatch(setConnectedDeviceAtStore({
                    id: device.id,
                    localName: device.localName,
                    name: device.name,
                }))
                console.log("Connect to ", connectedDevice.name);
            })
            .catch(err => {
                console.log(err);
                Alert.alert(`Counldn't connect to device ${device.name}`)
            })
    }

    const disconnectDevice = (device: Device) => {
        // todo disconnect
        // let DisconnectedDevice = await bleManager.cancelDeviceConnection(device.id)
        // console.log(DisconnectedDevice.name);
        setIsScanningStatus(false)
        setScannedDevices([])
    }

    const GetServicesLoaded_Readable = () => {
        setConnectedDevice(ConnectedDeviceStore.getState().device)
        bleManager.connectToDevice(ConnectedDevice?.id ?? "")
            .then(res => {
                res.discoverAllServicesAndCharacteristics()
                    .then(res => {
                        res.connect({ autoConnect: false })
                            .then(res => {
                                res.services()
                                    .then(data => {
                                        data[0].characteristics()
                                            .then(char => {
                                                setDeviceChar((char ?? []))
                                                setLoaded(true)
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                setLiveData("Press to Start")
                                            })
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        setLiveData("Press to Start")
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                                setLiveData("Press to Start")
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        setLiveData("Press to Start")
                    })
            })
            .catch(err => {
                console.log(err)
                setLiveData("Press to Start")
            })


    }


    return {
        requstPermissions,
        scanForDevices,
        ScannedDevices,
        connectToDevice,
        scanAllDevices,
        setScanAllDevices,
        disconnectDevice,
        isScanningStatus,
        // Live Data artifacts
        ConnectedDevice,
        setConnectedDevice,
        LiveData,
        setLiveData,
        DeviceChar,
        setDeviceChar,
        Loaded,
        setLoaded,
        GetServicesLoaded_Readable
    };
}