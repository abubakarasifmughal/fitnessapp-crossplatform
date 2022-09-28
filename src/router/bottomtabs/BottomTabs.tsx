import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Routes from './Routes';

const Tab = createBottomTabNavigator();

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
                  tabBarActiveTintColor: 'red',
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

export { BottomTabs }

const styles = StyleSheet.create({
  topBarContainer: {
    paddingTop: 14, paddingBottom: 14,
    backgroundColor: 'white',
  },
  HeaderText: { fontSize: 20, fontWeight: '400', color: 'rgb(80,80,80)', alignSelf: 'center', },
})