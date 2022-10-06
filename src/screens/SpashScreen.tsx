import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SpashScreen = () => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'white' }}>
            <Image source={require('../../assets/logo.png')}
                resizeMode='contain'
            />
            <Text style={{ fontSize: 20, fontWeight: '400' }}>Loading...</Text>
        </View>
    )
}

export default SpashScreen

const styles = StyleSheet.create({})