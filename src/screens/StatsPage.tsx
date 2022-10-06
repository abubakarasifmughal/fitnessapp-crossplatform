import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import TestNameInputField from '../components/TestNameInputField'
import PointerSlider from '../components/PointerSlider'
import Pie_Chart from '../components/Pie_Chart'
import { SafeAreaView } from 'react-native-safe-area-context'

const StatsPage = ({ navigation }: any) => {
    const [LowerBoundary, setLowerBoundary] = useState(-100)
    const [UpperBoundary, setUpperBoundary] = useState(100)
    const [PointerLocation, setPointerLocation] = useState(0)

    const onPressMotionGraph = () => {
        navigation.navigate('Motion Graph')
    }

    return (
        <SafeAreaView style={{ height: "100%", }}>
            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {
                    setPointerLocation(90)
                }} style={{ height: 40 }} />
                <TestNameInputField />
                <PointerSlider
                    LowerBoundary={LowerBoundary}
                    UpperBoundary={UpperBoundary}
                    PointerLocation={PointerLocation}
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
                <View style={{ height: 120 }} />

            </ScrollView>
            <View style={{
                shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowRadius: 5, shadowOpacity: 1
            }}>
                <TouchableOpacity style={{
                    marginLeft: 15, marginRight: 15, marginBottom: 15,
                    alignItems: 'center', backgroundColor: 'white', borderColor: 'black',
                    borderWidth: 2, borderRadius: 10
                }} onPress={() => onPressMotionGraph()} >
                    <Text style={{ color: 'black', padding: 10, fontSize: 18 }}>Motion Graph</Text>
                </TouchableOpacity>
        </View>
        </SafeAreaView >

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