import { useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native"
import { BleManager, Device } from "react-native-ble-plx"
import { atob } from "react-native-quick-base64";

/**
 * -------------------------------------------------------
 * | Characteristics extracted from the java source code |
 * -------------------------------------------------------
 * private static final String CHARACTERISTIC_CONFIG = "00002902-0000-1000-8000-00805f9b34fb"  ;
 * private final static String CHARACTERISTIC_READABLE = "4ac8a682-9736-4e5d-932b-e9b31405049c";
 * private final static String CHARACTERISTIC_WRITABLE = "0972EF8C-7613-4075-AD52-756F33D4DA91";
 */

const DEVICE_ID = "FDBA00A5-2EFC-3C0A-D425-CCD83ADE5A4B";
const CHARACTERISTIC_CONFIG = "00002902-0000-1000-8000-00805f9b34fb";
const CHARACTERISTIC_READABLE = "4ac8a682-9736-4e5d-932b-e9b31405049c";
const CHARACTERISTIC_WRITABLE = "0972EF8C-7613-4075-AD52-756F33D4DA91";


// Readible : 4ac8a682-9736-4e5d-932b-e9b31405049c
// CHARACTERISTIC_WRITABLE = "0972EF8C-7613-4075-AD52-756F33D4DA91";


type PermissionCallback = (result: boolean) => void

interface BluetoothLowEnergyApi {
    requstPermissions(callback: PermissionCallback): Promise<void>;
    scanForDevices(): void;
    disconnectDevice(device: Device | null): void;
    connectToDevice(device: Device): Promise<void>;
    ScannedDevices: Device[];
    connectedDevice: Device | null;
    scanAllDevices: boolean;
    setScanAllDevices: React.Dispatch<React.SetStateAction<boolean>>;
}

const bleManager = new BleManager();

export default function useBLE(): BluetoothLowEnergyApi {

    const [ScannedDevices, setScannedDevices] = useState<Device[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)
    const [scanAllDevices, setScanAllDevices] = useState(false)
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

    const scanForDevices = () => {

        bleManager.startDeviceScan(null, { allowDuplicates: false }, (error, scannedDevice) => {
            if (error) {
                console.log(error);
            } else {
                if (scannedDevice
                    && scannedDevice.name !== null
                    // todo uncheck this one in case you strictly want the "BackAware devices" only
                    && (scannedDevice.name?.toUpperCase().includes("BackAware".toUpperCase()) || scanAllDevices)
                ) {
                    if (!isDuplicateDevice(ScannedDevices, scannedDevice)) {
                        setScannedDevices([...ScannedDevices, scannedDevice])
                    }
                }
            }
        })
    }

    const connectToDevice = async (device: Device) => {
        try {
            const deviceConnection = await bleManager.connectToDevice(device.id)
            setConnectedDevice(deviceConnection)
            console.log("Connected with", connectedDevice?.name);
            bleManager.stopDeviceScan();
            await connectedDevice?.discoverAllServicesAndCharacteristics();
            await startStreamingData(device)
        } catch (e) {
            console.log("Error while connecting to the device", e)
        }
    }

    const startStreamingData = async (device: Device) => {
        console.log("Executed");
        console.log(device.name);

        if (device) {
            console.log("Im in");

            device.discoverAllServicesAndCharacteristics('')
            .then(value => {
                console.log("Device Characteristics are");
                console.log(value.id);
                console.log(value.name);
                console.log(value.serviceUUIDs);
                console.log(value.solicitedServiceUUIDs);
                console.log(value.serviceData);
                console.log(value.serviceData);
                console.log("Device Characteristics END----");
            })

            device.monitorCharacteristicForService(
                // CHARACTERISTIC_CONFIG,
                DEVICE_ID,
                CHARACTERISTIC_READABLE,
                (err, char) => {
                    if (err) {
                        console.log("XXXXxxxXXXXXxxxxx");
                        console.log("ERROR from DEVICE");
                        console.log(err);
                        console.log("XXXXxxxXXXXXxxxxx");

                    } else if (!char?.value) {
                        Alert.alert("No Characteristics were found on " + char?.deviceID)
                        return
                    }

                    const rawData = atob(char?.value)

                    const dataFromDevice = Number(rawData)
                    console.log("----------------");
                    // console.log(dataFromDevice);
                    console.log("----------------");
                    

                    console.log(char?.id);
                    console.log(char?.deviceID);
                    console.log(char?.descriptors);
                    console.log(char?.isReadable);
                    console.log(char?.isIndicatable);
                    console.log(char?.uuid);
                    console.log(char?.serviceUUID);
                }
            )
        } else {
            console.log("No device connected")
        }
    }

    const disconnectDevice = async (device: Device) => {
        // todo disconnect
        // let DisconnectedDevice = await bleManager.cancelDeviceConnection(device.id)
        // console.log(DisconnectedDevice.name);
        setScannedDevices([])
        setConnectedDevice(null)
    }

    return {
        requstPermissions,
        scanForDevices,
        ScannedDevices,
        connectToDevice,
        connectedDevice,
        scanAllDevices,
        setScanAllDevices,
        disconnectDevice,
    };
}