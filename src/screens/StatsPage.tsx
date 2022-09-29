import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import TestNameInputField from '../components/TestNameInputField'
import PointerSlider from '../components/PointerSlider'
import Pie_Chart from '../components/Pie_Chart'

const StatsPage = ({ navigation }: any) => {
    const [LowerBoundary, setLowerBoundary] = useState(-100)
    const [UpperBoundary, setUpperBoundary] = useState(100)
    const [PointerLocation, setPointerLocation] = useState(0)


    return (
        <ScrollView>
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