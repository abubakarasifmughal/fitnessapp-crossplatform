import * as React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Modal, Text, View } from 'react-native';
import { Routes } from './Routes';
import BottomNavbar from '../shared/BottomNavbar';
import SpashScreen from '../pages/SpashScreen';


const Tabs = createBottomTabNavigator()
export default function BottomRouter() {
    const navRef = useNavigationContainerRef()
    const [Loading, setLoading] = React.useState(true)

    return (
        <NavigationContainer
            ref={navRef}
            onReady={() => {
                setTimeout(() => {
                    setLoading(false)
                  }, 2000)
            }}
        >
            <Modal
                animationType='fade'
                visible={Loading}>
                <SpashScreen />
            </Modal>
            {
                !Loading &&
                <Tabs.Navigator tabBar={({ navigation }) => <BottomNavbar activeRoute={navRef.getCurrentRoute()?.name} routes={Routes} navigation={navigation} />}>
                    {
                        Routes.map((route, index) => (
                            <Tabs.Screen key={index} component={route.component} name={route.label} options={{
                                headerShown: route.showHeader,
                                tabBarIcon: () => <Image source={require('../../assets/settings.png')} style={{ height: 20, width: 20, tintColor: 'red' }} />
                            }} />

                        ))
                    }
                </Tabs.Navigator>}
        </NavigationContainer>
    );
}