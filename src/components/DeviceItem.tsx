import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Device } from 'react-native-ble-plx'
import ConnectionState from '../shared/ConnectionState'
import { ConnectedDeviceStore, setConnectedDeviceInStore, } from '../shared/Store'
import useBle from '../shared/Ble'

const DeviceItem = ({ device }: { device: Device | undefined }) => {
    const [connectionState, setConnectionState] = useState(ConnectionState.DISCONNECTED);

    const {
        ConnectToDevice,
    } = useBle();

    ConnectedDeviceStore.subscribe(() => {
        console.log("Connected");
        setConnectionState(ConnectionState.CONNECTED)
    })

    return (
        <TouchableOpacity key={1}
            style={{ width: '100%', marginBottom: 10 }}
            onPress={() => {
                if (device) {
                    setConnectionState(ConnectionState.CONNECTING)
                    ConnectToDevice(device)
                }
            }}>
            <View style={{
                padding: 5, borderBottomColor: 'gray', borderBottomWidth: 1, flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center'
            }}>
                <View style={{}}>
                    <Text style={{ marginBottom: 5, fontSize: 18, fontWeight: '600' }}>{device?.name}</Text>
                    <Text style={{ padding: 0, }}>{device?.id}</Text>
                </View>
                {
                    connectionState === ConnectionState.CONNECTING &&
                    <ActivityIndicator />
                }
                {
                    connectionState === ConnectionState.CONNECTED &&
                    <Text style={{fontSize:18}}>✔️</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

export default DeviceItem

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