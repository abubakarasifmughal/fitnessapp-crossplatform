import { Animated, Button, Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import TestNameInputField from '../components/TestNameInputField'
import PointerSlider from '../components/PointerSlider'
import Pie_Chart from '../components/Pie_Chart'
import useBLE from '../shared/useBle'
import { atob } from 'react-native-quick-base64'

const TOTAL_SIDE_LENGTH = 165;

const StatsPage = ({ navigation }: any) => {
    const [LowerBoundary, setLowerBoundary] = useState(-100)
    const [UpperBoundary, setUpperBoundary] = useState(100)
    const [PointerLocation, setPointerLocation] = useState(0)
    const [ZeroError, setZeroError] = useState("NaN")

    const [CalibrationInProgress, setCalibrationInProgress] = useState(true)
    const [NegativeError, setNegativeError] = useState<number | null>(null)
    const [PositiveError, setPositiveError] = useState<number | null>(null)

    const {
        ConnectedDevice,
        setConnectedDevice,
        DeviceChar,
        setDeviceChar,
        LiveData,
        setLiveData,
        Loaded,
        setLoaded,
        GetServicesLoaded_Readable
    } = useBLE()

    const doZeroErrorCorrection = () => {
        if (DeviceChar.length == 0) {
            GetServicesLoaded_Readable()
        } else {
            DeviceChar.filter(it => it.isReadable)[0].read()
                .then(val => {
                    setZeroError(Number.parseInt(atob(val.value ?? "0")).toString())
                })
                .catch(err => {
                    setZeroError("Press to Start")
                })
        }
    }

    useEffect(
        () => {
            if (DeviceChar.length == 0) {
                GetServicesLoaded_Readable()
            } else {
                let interval: number = setInterval(() => {
                    DeviceChar.filter(it => it.isReadable)[0].read()
                        .then(val => {
                            setLiveData(Number.parseInt(atob(val.value ?? "0")).toString())
                        })
                        .catch(err => {
                            setLiveData("Press to Start")
                        })
                }, 1000);
                return () => {
                    clearInterval(interval);
                }
            }

        }, [DeviceChar]
    )

    return (
        <>
            <ScrollView >
                {/* <TouchableOpacity style={{ marginTop: 15, marginBottom: 5, flexDirection: 'row', justifyContent: 'center' }} >
                    <Text style={{ textAlign: 'center' }}>({NegativeError},0,{PositiveError}) :: {LiveData} - {ZeroError} = </Text>
                    <Text style={{ textAlign: 'center', color: (Number.parseInt(LiveData) - Number.parseInt(ZeroError)) > 0 ? 'green' : 'red' }}>{(Number.parseInt(LiveData) - Number.parseInt(ZeroError))}</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={{ marginTop: 15, marginBottom: 5, flexDirection: 'row', justifyContent: 'center' }} >
                    <Text style={{ textAlign: 'center', color: (Number.parseInt(LiveData) - Number.parseInt(ZeroError)) > 0 ? 'green' : 'red' }}>{
                        ((
                            (
                                Number.parseInt(LiveData) - Number.parseInt(ZeroError)
                            ) / (Number.parseInt(LiveData) - Number.parseInt(ZeroError) > 0 ? (PositiveError ?? 0) : (NegativeError ?? 0)) //This number here defines one side of scale
                        ) * TOTAL_SIDE_LENGTH).toFixed(0)
                    }</Text>
                </TouchableOpacity>
                <TestNameInputField
                    pressHandler={GetServicesLoaded_Readable} />
                <Button title='Calibrate' onPress={() => {
                    setNegativeError(null)
                    setPositiveError(null)
                    setCalibrationInProgress(true)
                }} />
                <PointerSlider
                    LowerBoundary={LowerBoundary}
                    UpperBoundary={UpperBoundary}
                    PointerLocation={
                        (
                            (
                                Number.parseInt(LiveData) - Number.parseInt(ZeroError)
                            ) / (Number.parseInt(LiveData) - Number.parseInt(ZeroError) > 0 ? (PositiveError ?? 0) : (NegativeError ?? 0)) //This number here defines one side of scale
                        ) * TOTAL_SIDE_LENGTH
                    }
                    setLowerBoundary={setLowerBoundary}
                    setUpperBoundary={setUpperBoundary}
                    setPointerLocation={setPointerLocation}
                />
                <CalibrationButtons
                    LowerBoundary={LowerBoundary}
                    UpperBoundary={UpperBoundary}
                    PointerLocation={PointerLocation}
                    setLowerBoundary={setLowerBoundary}
                    setUpperBoundary={setUpperBoundary}
                    setPointerLocation={setPointerLocation}
                />
                <StopButton
                    setPointerLocation={setPointerLocation}
                    PointerLocation={PointerLocation}
                />
                <Pie_Chart />
                <View style={{ height: 20 }} />

                <View style={[styles.RowMargined, {}]}>
                    <TouchableOpacity style={styles.CalibrationButton}
                        onPress={() => {
                            navigation.navigate("Statistics Movement Graph")
                        }}>
                        <Text style={styles.ButtonText}>Movement Graph</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 120 }} />
            </ScrollView>
            <Modal visible={CalibrationInProgress} animationType='slide' transparent={true}>
                <View style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: '600', marginBottom: 20 }}>Calibrate Device</Text>
                    {
                        ZeroError === 'NaN' &&
                        <>
                            <Button title='Start Calibration' onPress={doZeroErrorCorrection} />
                            <Button title='Cancel' color={'red'} onPress={() => setCalibrationInProgress(false)} />
                        </>
                    }
                    {
                        ZeroError !== 'NaN' &&
                        <>
                            {
                                NegativeError === null &&
                                <>
                                    <Text style={{ color: 'white', fontSize: 17, fontWeight: '600', marginTop: 10 }}>Flex the device to lowest negative number</Text>
                                    <TouchableOpacity style={{ marginTop: 15, marginBottom: 5, flexDirection: 'row', justifyContent: 'center' }} >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>{LiveData} - {ZeroError} = </Text>
                                        <Text style={{ textAlign: 'center', color: (Number.parseInt(LiveData) - Number.parseInt(ZeroError)) > 0 ? 'green' : 'red' }}>{(Number.parseInt(LiveData) - Number.parseInt(ZeroError))}</Text>
                                    </TouchableOpacity>

                                    <Button title='Calibrate Negative' color={'red'} onPress={() => {
                                        setNegativeError(-(Number.parseInt(LiveData) - Number.parseInt(ZeroError)))
                                    }} />
                                </>
                            }
                            {
                                PositiveError === null && NegativeError !== null &&
                                <>
                                    <Text style={{ color: 'white', fontSize: 17, fontWeight: '600', marginTop: 10 }}>Flex the device to highest positive number</Text>
                                    <TouchableOpacity style={{ marginTop: 15, marginBottom: 5, flexDirection: 'row', justifyContent: 'center' }} >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>{LiveData} - {ZeroError} = </Text>
                                        <Text style={{ textAlign: 'center', color: (Number.parseInt(LiveData) - Number.parseInt(ZeroError)) > 0 ? 'green' : 'red' }}>{(Number.parseInt(LiveData) - Number.parseInt(ZeroError))}</Text>
                                    </TouchableOpacity>
                                    <Button title='Calibrate Positive' color={'green'} onPress={() => {
                                        setPositiveError((Number.parseInt(LiveData) - Number.parseInt(ZeroError)))
                                        setCalibrationInProgress(false)
                                    }} />
                                </>
                            }
                        </>
                    }
                </View>
            </Modal>
        </>
    )
}

const CalibrationButtons = (
    {
        LowerBoundary,
        UpperBoundary,
        setLowerBoundary,
        setUpperBoundary,
        PointerLocation,
        setPointerLocation
    }: {
        LowerBoundary: any,
        UpperBoundary: any,
        setLowerBoundary: any,
        setUpperBoundary: any
        PointerLocation: any
        setPointerLocation: any
    }
) => {
    return <View style={styles.RowMargined}>
        <TouchableOpacity style={styles.CalibrationButton}
            onPress={onPressNormalCalibrate()}>
            <Text style={styles.ButtonText}>
                Normal Calibrate
            </Text>
        </TouchableOpacity>
        <View style={{ width: 15 }} />
        <TouchableOpacity style={styles.CalibrationButton}
            onPress={onPressHardCalibrate()}>
            <Text style={styles.ButtonText}>
                Hard Calibrate
            </Text>
        </TouchableOpacity>
    </View>

    function onPressNormalCalibrate() {
        return () => {
            setLowerBoundary(-50)
            setUpperBoundary(50)
        }
    }

    function onPressHardCalibrate() {
        return () => {
            setLowerBoundary(-100)
            setUpperBoundary(100)
        }
    }
}

const StopButton = ({
    PointerLocation,
    setPointerLocation
}: {
    PointerLocation: any,
    setPointerLocation: any
}) => {
    return <View style={styles.RowMargined}>
        <TouchableOpacity style={styles.CalibrationButton}
            onPress={onPressStop()}>
            <Text style={styles.ButtonText}>Stop</Text>
        </TouchableOpacity>
    </View>

    function onPressStop() {
        return () => {
            setPointerLocation(0)
        }
    }
}


export default StatsPage

const styles = StyleSheet.create({
    CalibrationButton: {
        backgroundColor: 'rgb(0,100,255)', flex: 1,
        textAlign: 'center', height: 40, justifyContent: 'center',
        borderRadius: 5,
    },
    ButtonText: { textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 'bold' },
    RowMargined: { flexDirection: 'row', justifyContent: 'space-between', padding: 0, width: '90%', alignSelf: 'center', marginTop: 15 }
})