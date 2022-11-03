import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CalibrationSettingsPage from '../../screens/CalibrationPage'
import Settings from '../../screens/Settings'
import CalibrationPage from '../../screens/CalibrationPage'


const Stack = createNativeStackNavigator()

const CalibrationStack = () => {
    return (
        <View style={{ height: '100%', }}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                headerShown: true,
                headerBackTitleVisible: false,
                headerTintColor: 'black',
                headerTitleAlign: 'center'
            }}>
                <Stack.Screen name={'Calibrations'} component={Settings} options={{ title: "Settings" }} />
                <Stack.Screen name={'Calibration Settings'} component={CalibrationPage} />
            </Stack.Navigator>
        </View>
    )
}

export default CalibrationStack;

const styles = StyleSheet.create({})




