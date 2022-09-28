import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native"
import { BleManager, Device } from "react-native-ble-plx"

type PermissionCallback = (result: boolean) => void

interface BluetoothLowEnergyApi {
    requstPermissions(callback: PermissionCallback): Promise<void>;
    scanForDevices(): void;
    ScannedDevices: Device[];
}

const bleManager = new BleManager();

export default function useBLE(): BluetoothLowEnergyApi {

    const [ScannedDevices, setScannedDevices] = useState<Device[]>([]);

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

    const scanForDevices = () => {

        bleManager.startDeviceScan(null, { allowDuplicates: false }, (error, scannedDevice) => {
            if (error) {
                console.log(error);
            } else {
                if (scannedDevice
                    && scannedDevice.name !== null
                    // todo uncheck this one in case you strictly want the "BackAware devices" only
                    // && scannedDevice.name?.toUpperCase().includes("BackAware".toUpperCase())
                ) {
                    if (!isDuplicateDevice(ScannedDevices,scannedDevice)) {
                        setScannedDevices([...ScannedDevices,scannedDevice])
                    }
                }
            }
        })
    }

    return {
        requstPermissions,
        scanForDevices,
        ScannedDevices
    };
}