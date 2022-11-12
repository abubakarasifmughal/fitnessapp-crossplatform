import { StyleSheet, Text, View } from 'react-native'
import React, {} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StatsPage from '../pages/StatsPage'
import StatsBarGraph from '../pages/StatsBarGraph'
// import Plans from '../../screens/Plans'
// import PlanDetailPage from '../../screens/PlanDetailPage'
// import StatsBarGraph from '../../screens/StatsBarGraph'
// import StatsPage from '../../screens/StatsPage'


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
                <Stack.Screen name={'Statistics Page'} component={StatsPage} options={{title:'Statistics'}} />
                <Stack.Screen name={'Statistics Movement Graph'} options={{title:'Track Your Workout'}} component={StatsBarGraph} />
            </Stack.Navigator>
        </View>
    )
}

export default StatsStack;

const styles = StyleSheet.create({})




