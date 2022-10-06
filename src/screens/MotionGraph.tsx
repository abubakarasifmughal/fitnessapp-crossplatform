import {Animated ,Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
const { height, width } = Dimensions.get('screen')

const MotionGraph = () => {

    return (
        <ScrollView>
            <Animated.View style={{
                backgroundColor: 'black', height: height*0.5,
                borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                justifyContent: 'space-between',
                paddingBottom: 10,
                shadowColor: 'rgb(50,50,50)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 10,
            }}>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Test Name: {"<Current test appears here>"}</Text>
                </View>
                <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={{ borderWidth: 2, borderColor: 'white', borderRadius: 30, paddingLeft: 8, paddingRight: 8, marginRight: 10 }}>
                        <Text style={{ fontSize:20,color: 'white', textAlign: 'center', padding: 3 }}>Stop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 2, borderColor: 'white', borderRadius: 30, paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{ fontSize:20,color: 'white', textAlign: 'center', padding: 3 }}>Normal Calibrate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 2, borderColor: 'white', borderRadius: 30, paddingLeft: 10, paddingRight: 10, marginLeft: 10 }}>
                        <Text style={{ fontSize:20,color: 'white', textAlign: 'center', padding: 3 }}>Hard Calibrate</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </ScrollView>
    )
}

export default MotionGraph

const styles = StyleSheet.create({})