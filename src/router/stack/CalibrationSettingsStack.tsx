import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SettingsPage from '../../screens/SettingsPage'
import CalibrationSettingsPage from '../../screens/CalibrationSettingsPage'


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
                <Stack.Screen name={'Settings'} component={SettingsPage} />
                <Stack.Screen name={'Calibration Settings'} component={CalibrationSettingsPage} />
            </Stack.Navigator>
        </View>
    )
}

export default CalibrationSettingsStack

const styles = StyleSheet.create({})




