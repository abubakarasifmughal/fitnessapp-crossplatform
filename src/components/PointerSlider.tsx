import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'

const PointerSlider = (
    {
        LowerBoundary,
        UpperBoundary,
        PointerLocation,
        setLowerBoundary,
        setUpperBoundary,
        setPointerLocation
    }: {
        LowerBoundary: any,
        UpperBoundary: any,
        PointerLocation: any,
        setLowerBoundary: any,
        setUpperBoundary: any,
        setPointerLocation: any,
    }
) => {
    const DURATION = 1000;
    const POINTER_DURATION = 1000;
    const ELASTIC_AMOUNT = 2;
    const SpectrumColors = ['red', 'yellow', '#12AD2B', 'yellow', 'red']
    const lowerPointerBar = useRef(new Animated.Value(LowerBoundary)).current;
    const upperPointerBar = useRef(new Animated.Value(UpperBoundary)).current;
    const pointerLocation = useRef(new Animated.Value(0)).current;

    
    useEffect(() => {
        if(JSON.stringify(PointerLocation) !== 'null'){
        Animated.timing(lowerPointerBar, {
            toValue: LowerBoundary,
            useNativeDriver: true,
            duration: DURATION,
            easing: Easing.elastic(ELASTIC_AMOUNT)
        }).start()
        Animated.timing(upperPointerBar, {
            toValue: UpperBoundary,
            useNativeDriver: true,
            duration: DURATION,
            easing: Easing.elastic(ELASTIC_AMOUNT)
        }).start()

        Animated.timing(pointerLocation, {
            toValue: PointerLocation,
            useNativeDriver: true,
            duration: POINTER_DURATION,
            easing: Easing.elastic(ELASTIC_AMOUNT)
        }).start()
        }
    }, [LowerBoundary, UpperBoundary, PointerLocation])

    return (
        <View>
            <Text style={styles.PositionLabel}>Current Position</Text>
            <View style={styles.PointerSpace}>
                <Animated.Image source={require('../../assets/pointer.png')}
                    style={{ width: 40, height: 40, transform: [{ translateX:  pointerLocation }] }}
                    resizeMode="contain" />

            </View>
            <View>
                <LinearGradient colors={SpectrumColors}
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                    style={styles.GradientCSS} >
                    <Animated.View style={[
                        styles.ExtremeBar,
                        {
                            transform: [{
                                translateX: lowerPointerBar
                            },
                            { translateY: -5 }]
                        }]} />

                    <Animated.View style={[
                        styles.ExtremeBar,
                        {
                            transform: [{
                                translateX: upperPointerBar
                            },
                            { translateY: -5 }]
                        }]} />
                </LinearGradient>

            </View>
        </View>
    )
}

export default PointerSlider

const styles = StyleSheet.create({
    GradientCSS: {
        height: 40, width: '90%', alignSelf: 'center', borderRadius: 5,
        flexDirection: 'row', justifyContent: 'center',
        overflow: 'hidden',
    },
    ExtremeBar: { height: 50, width: 3, backgroundColor: 'black', position: 'absolute' },
    PositionLabel: { textAlign: 'center', margin: 20, fontSize: 17, color: 'rgb(90,90,90)' },
    PointerSpace: {
        width: '90%', alignSelf: 'center', position: 'absolute', zIndex: 10,
        transform: [{ translateY: 45 }], alignItems: 'center',
    },
})

// back = 689
// 0 = 1680
// forw = 1856
// ---------------