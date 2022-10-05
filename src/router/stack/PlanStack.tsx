import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Plans from '../../screens/Plans'
import PlanDetailPage from '../../screens/PlanDetailPage'


const Stack = createNativeStackNavigator()

const PlanStack = () => {
    return (
        <View style={{ height: '100%', }}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                headerShown: true,
                headerBackTitleVisible:false,
                headerTintColor:'black',
                headerTitleAlign:'center'
            }}>
                <Stack.Screen name={'Plan'} component={Plans} options={{
                }}/>
                <Stack.Screen name={'Plan Detail'} component={PlanDetailPage} />
            </Stack.Navigator>
        </View>
    )
}

export default PlanStack;

const styles = StyleSheet.create({})




