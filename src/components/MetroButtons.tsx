import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MetroButtons = (
    {
        label, onPressHandler,
    }:
        {
            label: string,
            onPressHandler: () => void,
        }
) => {
    return (
        <TouchableOpacity onPress={onPressHandler}
            style={styles.Container}>
            <Text style={styles.Label}>{label}</Text>
        </TouchableOpacity>
    )
}

export default MetroButtons

const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: 'black', padding: 10, borderRadius: 5 },
    Label: { color: 'white', textAlign: 'center', fontSize: 18 },
})