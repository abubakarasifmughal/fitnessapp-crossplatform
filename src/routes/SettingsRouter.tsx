import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from '../pages/Bluetooth'
import CalibrationPage from '../pages/CalibrationPage'

const Stack = createNativeStackNavigator()

const SettingsRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Settings} name="Settings_stack" options={{ headerTitle: 'Settings' }} />
      <Stack.Screen component={CalibrationPage} name="Settings_calibration_stack" options={{ headerTitle: "Calibration" }} />
    </Stack.Navigator>
  )
}

export default SettingsRouter