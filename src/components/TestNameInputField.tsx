import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const TestNameInputField = ({ pressHandler }: { pressHandler: any }) => {
    return (
        <View style={styles.ShadowedContainer}>
            <View style={styles.Card}>
                <TextInput style={styles.InputField} />
                <Text style={styles.ActionButton}
                onPress={pressHandler}>GO</Text>
            </View>
        </View>
    )
}

export default TestNameInputField

const styles = StyleSheet.create({
    ShadowedContainer: {
        shadowColor: 'gray', shadowOpacity: 1, shadowRadius: 2,
        shadowOffset: { height: 0, width: 0 }, alignItems: 'center'
    },
    Card: {
        alignItems: 'center', paddingTop: 10, paddingBottom: 10,
        flexDirection: 'row', justifyContent: 'center', marginTop: 10, paddingLeft: 10, paddingRight: 10,
        marginBottom: 10, backgroundColor: 'white', width: "70%", borderRadius: 5,
    },
    InputField: { width: '80%', padding: 5, borderColor: 'gray', borderWidth: 2, borderRadius: 5 },
    ActionButton: { width: '20%', textAlign: 'center', color: 'rgb(0,150,255)', fontWeight: 'bold', fontSize: 17, }
})