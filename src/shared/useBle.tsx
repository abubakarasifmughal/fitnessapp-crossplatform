import { useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native"
import { BleManager, Device } from "react-native-ble-plx"
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
}

const bleManager = new BleManager();

export default function useBLE(): BluetoothLowEnergyApi {

    const [ScannedDevices, setScannedDevices] = useState<Device[]>([]);
    // const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)
    const [scanAllDevices, setScanAllDevices] = useState(false)
    const [isScanningStatus, setIsScanningStatus] = useState(false)
    // todo will attach to the datastream later
    const [flexValue, setFlexValue] = useState(0.0)

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
                    id:device.id,
                    localName:device.localName,
                    name:device.name,
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
        setScannedDevices([])
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
    };
}