import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Routes from './Routes';
import { BleManager as bleManager } from 'react-native-ble-plx';

const Tab = createBottomTabNavigator();

const manager = new bleManager()
let scanningIntervalID: any = undefined;

function scanDevicesAround(manager: bleManager, devicesArr: any, setDevicesArr: any) {
  manager.state().then((value) => {
    if (value === "PoweredOff") {
      Alert.alert("Bluetooth Turned Off")
      manager.stopDeviceScan()
    }
    if (value === "PoweredOn") {
      manager.startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
        if (error) {
          // Handle error (scanning will be stopped automatically)
          console.log("\n\n'''''''''''''''''''''''ERROR START");
          console.log(error);
          console.log("\n\n'''''''''''''''''''''''ERROR END");
          manager.stopDeviceScan();
          return
        }
        // console.log("Scanning ");

        if (device?.name !== null) {
          if (devicesArr.filter((value: { name: string | null | undefined; }) => value.name === device?.name).length <= 0) {
            setDevicesArr([...devicesArr, device ?? null])
            console.log(device?.name);
            console.log(device?.id);
            console.log(device?.serviceData);
            console.log(device?.localName);
            console.log("---------");

          }
        }
        manager.stopDeviceScan()
      });
    }
  })
}



const BottomTabs = () => {

  // Refs
  const navRef = useNavigationContainerRef()
  
  return (
    <View style={{ height: '100%' }}>
      <NavigationContainer
        ref={navRef}
        onStateChange={
          (val) => {
            
          }
        }
      >
        <Tab.Navigator screenOptions={{
          headerTitleAlign: 'center'
        }}>
          {
            Routes.map((route, index) => {
              return (
                <Tab.Screen key={index} name={route.name} component={route.component} options={{
                  tabBarIcon: () => route.icons(navRef.getCurrentRoute()?.name.includes(route.name) ?? true),
                  tabBarStyle: { paddingBottom: 5, paddingTop: 5, },
                  tabBarActiveTintColor: 'black',
                  headerShown: route.headerShown
                }}
                />
              )
            })
          }
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  )
}

export { BottomTabs, manager, scanningIntervalID, scanDevicesAround }

const styles = StyleSheet.create({
  topBarContainer: {
    paddingTop: 14, paddingBottom: 14,
    backgroundColor: 'white',
  },
  HeaderText: { fontSize: 20, fontWeight: '400', color: 'rgb(80,80,80)', alignSelf: 'center', },
})