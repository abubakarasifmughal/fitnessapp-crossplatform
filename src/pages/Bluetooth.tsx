import { Button, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import MetroButtons from '../components/MetroButtons'
import useBle from '../shared/Ble'
import DeviceItem from '../components/DeviceItem'
import RadioButton from '../components/RadioButton'
import { ApplicationMode } from '../shared/ApplicationMode'

const Settings = ({ navigation }: { navigation: any }) => {
    const [Mode, setMode] = useState(ApplicationMode.GymMode)

    const {
        StartScan,
        StopScan,
        ScannedDevices,
        LiveData,
        GetLiveData_Android,
        setLiveData,
    } = useBle();

    const onPressScanNow = () => {
        StartScan()
    }

    const onPressStopScan = () => {
        StopScan()
    }


    return (
        <View style={{ paddingTop: 10, alignItems: 'center', height: "100%" }}>

            <View style={{ flexDirection: 'row', width: '90%' }}>
                <Text style={styles.h1Flexed}>Select Mode</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 15, fontWeight: '500' }}>{true ? "Scan all devices" : "BackAware only"}</Text>
                    <Switch
                        style={{ transform: [{ scale: 0.75 }] }}
                        // onChange={() => setScanAllDevices(!scanAllDevices)}
                        // value={scanAllDevices}
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

            <Text style={[styles.h1,{marginBottom:10}]}>Bluetooth Connection</Text>


            <View style={{ flexDirection: 'row', margin: 10, width: "90%" }}>
                <MetroButtons
                    label='Stop Scan'
                    onPressHandler={onPressStopScan}
                />
                <View style={{ width: 10 }} />
                <MetroButtons
                    label='Scan Now'
                    onPressHandler={onPressScanNow}
                />
            </View>




            <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
                <ScrollView contentContainerStyle={{
                    width: "100%",
                    paddingTop: 10,
                }}
                    style={{ width: '100%', }}>

                    <View style={{ flex: 1 }}>
                        {
                            ScannedDevices.map((d, i) => <DeviceItem key={i} device={d} />)
                        }
                    </View>

                </ScrollView>
            </View>



            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('calibration_stack')
                }} style={[styles.metroButtonBlackExtended, { marginBottom: 15 }]}>
                <Text style={styles.ButtonText}>Calibration Settings</Text>
            </TouchableOpacity>

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