import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const LabledVideoComponents = () => {
    return (
        <TouchableOpacity style={{ width: '95%', alignSelf: 'center', marginTop: 10, marginBottom: 10, flexDirection: 'row',alignItems:'center' }}>
            <Image source={require('../../assets/pointer.png')}
                style={{ width: 100, height: 60, backgroundColor: 'gainsboro', marginRight: 15 }} />
            <Text style={{ flex: 1,justifyContent:'center',fontSize:15,fontWeight:'500' }}>LabledVideoComponents</Text>
        </TouchableOpacity>
    )
}

export default LabledVideoComponents

const styles = StyleSheet.create({})