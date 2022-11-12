import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Trainings from '../pages/Trainings'
import TrainingsDetailPage from '../pages/TrainingsDetailPage'


const Stack = createNativeStackNavigator()

const TrainingsStack = () => {
    return (
        <View style={{ height: '100%', }}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                headerShown: true,
                headerBackTitleVisible:false,
                headerTintColor:'black',
                headerTitleAlign:'center'
            }}>
                <Stack.Screen name={'Your Trainings'} component={Trainings} options={{
                }}/>
                <Stack.Screen name={'Trainings Detail'} component={TrainingsDetailPage} options={{
                }}/>
            </Stack.Navigator>
        </View>
    )
}

export default TrainingsStack;

const styles = StyleSheet.create({})




