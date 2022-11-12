import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import { Routes } from './Routes';
import BottomNavbar from '../shared/BottomNavbar';


const Tabs = createBottomTabNavigator()

export default function BottomRouter() {
    return (
        <NavigationContainer>
            <Tabs.Navigator tabBar={({ navigation }) => <BottomNavbar routes={Routes} navigation={navigation} />}>
                {
                    Routes.map((route, index) => (
                        <Tabs.Screen key={index} component={route.component} name={route.label} options={{
                            headerShown: route.showHeader,
                            tabBarIcon: () => <Image source={require('../../assets/settings.png')} style={{ height: 20, width: 20, tintColor: 'red' }} />
                        }} />

                    ))
                }
            </Tabs.Navigator>
        </NavigationContainer>
    );
}