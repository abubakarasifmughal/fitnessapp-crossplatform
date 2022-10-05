import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { VIDEOSTATUS } from '../shared/VIDEOSTATUS'

const LabledVideoComponents = () => {

    return (
        <>
            <TouchableOpacity style={{ width: '95%', alignSelf: 'center', marginTop: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
                console.log("HHAHA");
            }}>
                <Image source={require('../../assets/pointer.png')}
                    style={{ width: 100, height: 60, backgroundColor: 'gainsboro', marginRight: 15 }} />
                <Text style={{ flex: 1, justifyContent: 'center', fontSize: 15, fontWeight: '500' }}>Video Title here</Text>
            </TouchableOpacity>
        </>
    )
}

export default LabledVideoComponents

const styles = StyleSheet.create({})