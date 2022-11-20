import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MetroButtons = (
    {
        label, onPressHandler, loader
    }:
        {
            label: string,
            onPressHandler: () => void,
            loader: boolean,
        }
) => {
    return (
        <TouchableOpacity onPress={onPressHandler}
            style={styles.Container}>
            <Text style={styles.Label}>{label}</Text>
            {
                loader &&
                <ActivityIndicator/>
            }
        </TouchableOpacity>
    )
}

export default MetroButtons

const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: 'black', padding: 10, borderRadius: 5,flexDirection:'row',alignItems:'center',justifyContent:'center', },
    Label: { color: 'white', textAlign: 'center', fontSize: 18,marginLeft:5,marginRight:5 },
})