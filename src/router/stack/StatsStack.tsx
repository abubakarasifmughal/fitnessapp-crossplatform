import { StyleSheet, Text, View } from 'react-native'
import React, {} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StatsPage from '../../screens/StatsPage'
import MotionGraph from '../../screens/MotionGraph'


const Stack = createNativeStackNavigator()

const StatsStack = () => {
    return (
        <View style={{ height: '100%', }}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                headerShown: true,
                headerBackTitleVisible: false,
                headerTintColor: 'black',
                headerTitleAlign: 'center'
            }}>
                <Stack.Screen name={'Your Statistics'} component={StatsPage} options={{
                    title:"Stats"
                }} />
                <Stack.Screen name={'Motion Graph'}
                component={MotionGraph} 
                options={{
                    title:"Motion Graph"
                }}/>
            </Stack.Navigator>
        </View>
    )
}

export default StatsStack;

const styles = StyleSheet.create({})




