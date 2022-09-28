import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RadioButton = ({ label = "aa", active,onPressHandle }: { label: string, active: boolean,onPressHandle:any }) => {
    return (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center',flex:1 }} 
        onPress={onPressHandle}>
            <View style={{
                borderWidth: 1.5,
                borderColor: 'black',
                height: 23,
                width: 23,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    height: 15, width: 15,
                    backgroundColor: active ? 'black' : 'rgba(0,0,0,0)',
                    borderRadius: 10
                }} />
            </View>
            <Text style={{
                marginLeft: 10,
                fontSize: 17,
                fontWeight: '400'
            }}>{label}</Text>
        </Pressable>
    )
}

export default RadioButton

const styles = StyleSheet.create({})