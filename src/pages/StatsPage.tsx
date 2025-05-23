import { Animated, Button, Dimensions, Modal, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import TestNameInputField from '../components/TestNameInputField'
import PointerSlider from '../components/PointerSlider'
import Pie_Chart from '../components/Pie_Chart'
import useBle from '../shared/Ble'
import { ConnectedDeviceStore, LimitStore } from '../shared/Store'
import { Device } from 'react-native-ble-plx'

const TOTAL_SIDE_LENGTH = 165;

const StatsPage = ({ navigation }: any) => {
    // [Good, Average, Bad]
    const [Distribution, setDistribution] = useState([10,8,1])

    
    const [LowerBoundary, setLowerBoundary] = useState(-100)
    const [UpperBoundary, setUpperBoundary] = useState(100)
    const [PointerLocation, setPointerLocation] = useState(0)
    const [ZeroError, setZeroError] = useState("NaN")

    const [CalibrationInProgress, setCalibrationInProgress] = useState(true)
    const [NegativeError, setNegativeError] = useState<number | null>(null)
    const [PositiveError, setPositiveError] = useState<number | null>(null)

    const [FetchingInteval, setFetchingInteval] = useState(0)
    const [Fetching, setFetching] = useState(false)
    const [ConnectedToDevice, setConnectedToDevice] = useState(false)

    const {
        GetLiveData_Android,
        LiveData,
        setLiveData,
        ConnectToDevice,
    } = useBle()

    useEffect(() => {
        if (ConnectedDeviceStore.getState().device !== "") {
            let device: Device = JSON.parse(ConnectedDeviceStore.getState().device)
            ConnectToDevice(device, (connected => {
                if (connected) {
                    setConnectedToDevice(true)
                }
            }))
        }
        const interval = setInterval(() => {
            GetLiveData_Android((value) => {
                setLiveData(value)
            })
        }, 500)
        return () => clearInterval(interval)
    }, [])

    const doZeroErrorCorrection = () => {
        setZeroError(LiveData)
        console.log("Zeroed", ZeroError);
    }

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
                    pressHandler={() => { }

                    } />
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
                {/* <StopButton
                    setPointerLocation={setPointerLocation}
                    PointerLocation={PointerLocation}
                /> */}
                <TouchableOpacity style={{ padding: 10, alignSelf: 'center' }} onPress={() => {
                    setNegativeError(null)
                    setPositiveError(null)
                    setCalibrationInProgress(true)
                }}>
                    <Text style={{ color: 'rgb(90,90,240)', fontSize: 18 }}>Calibrate</Text>
                </TouchableOpacity>
                {/* Good,average,Bad  */}
                <Pie_Chart Series={Distribution} />
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
                    <TouchableOpacity style={{ padding: 10, alignSelf: 'center' }} onPress={() => {
                        doZeroErrorCorrection()
                    }}>
                        <Text style={{ color: 'rgb(70,70,255)', fontSize: 18 }}>Fix Zero</Text>
                    </TouchableOpacity>
                    {
                        (ZeroError !== 'NaN') &&
                        <>
                            {
                                (NegativeError === null) &&
                                <>
                                    <Text style={{ color: 'white', fontSize: 17, fontWeight: '600', marginTop: 10 }}>Flex the device to lowest negative number</Text>
                                    <TouchableOpacity style={{ marginTop: 15, marginBottom: 5, flexDirection: 'row', justifyContent: 'center' }} >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>{LiveData} - {ZeroError} = </Text>
                                        <Text style={{ textAlign: 'center', color: (Number.parseInt(LiveData) - Number.parseInt(ZeroError)) > 0 ? 'green' : 'red' }}>{(Number.parseInt(LiveData) - Number.parseInt(ZeroError))}</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity style={{ padding: 10, alignSelf: 'center' }} onPress={() => {
                                        setNegativeError(-(Number.parseInt(LiveData) - Number.parseInt(ZeroError)))
                                    }}>
                                        <Text style={{ color: 'red', fontSize: 18 }}>Calibrate Negative</Text>
                                    </TouchableOpacity>
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

                                    <TouchableOpacity style={{ padding: 10, alignSelf: 'center' }} onPress={() => {
                                        setPositiveError((Number.parseInt(LiveData) - Number.parseInt(ZeroError)))
                                        setCalibrationInProgress(false)
                                    }}>
                                        <Text style={{ color: 'green', fontSize: 18 }}>Calibrate Positive</Text>
                                    </TouchableOpacity>
                                </>
                            }
                        </>
                    }
                    <TouchableOpacity style={{ padding: 10, alignSelf: 'center' }} onPress={() => setCalibrationInProgress(false)}>
                        <Text style={{ color: 'red', fontSize: 18 }}>CANCEL</Text>
                    </TouchableOpacity>
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
            setLowerBoundary(-(LimitStore.getState().normalLowerLimit > TOTAL_SIDE_LENGTH ? TOTAL_SIDE_LENGTH : LimitStore.getState().normalLowerLimit))
            setUpperBoundary(+(LimitStore.getState().normalUpperLimit > TOTAL_SIDE_LENGTH ? TOTAL_SIDE_LENGTH : LimitStore.getState().normalUpperLimit))
        }
    }

    function onPressHardCalibrate() {
        return () => {
            setLowerBoundary(-(LimitStore.getState().hardLowerLimit > TOTAL_SIDE_LENGTH ? TOTAL_SIDE_LENGTH : LimitStore.getState().hardLowerLimit))
            setUpperBoundary(+(LimitStore.getState().hardUpperLimit > TOTAL_SIDE_LENGTH ? TOTAL_SIDE_LENGTH : LimitStore.getState().hardUpperLimit))
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