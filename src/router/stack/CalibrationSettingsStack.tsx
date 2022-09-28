import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CalibrationSettingsPage from '../../screens/CalibrationSettingsPage'
import SettingsForCalibrationPage from '../../screens/SettingsForCalibrationPage'


const Stack = createNativeStackNavigator()

const CalibrationSettingsStack = () => {
    return (
        <View style={{ height: '100%', }}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                headerShown: true,
                headerBackTitleVisible:false,
                headerTintColor:'black',
                headerTitleAlign:'center'
            }}>
                <Stack.Screen name={'Calibrations'} component={SettingsForCalibrationPage} options={{
                title:"Settings"
                }}/>
                <Stack.Screen name={'Calibration Settings'} component={CalibrationSettingsPage} />
            </Stack.Navigator>
        </View>
    )
}

export default CalibrationSettingsStack

const styles = StyleSheet.create({})




