import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
const BottomNavbar = ({ navigation, routes, activeRoute }: { navigation: any, routes: any[], activeRoute: string | undefined }) => {

    return (
        <View style={styles.tabBarStyle}>
            {
                routes.map((route, index) => (
                    <TouchableOpacity key={index}
                        style={styles.tabContainer}
                        onPress={() => {
                            navigation.navigate(route.label)
                        }}>
                        <Image source={route.icon} style={[styles.icon,activeRoute?.includes(route.label)?{tintColor:'black'}:null]} />
                        <Text style={[styles.label,activeRoute?.includes(route.label)?{color:'black'}:null]}>{route.label}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default BottomNavbar

const styles = StyleSheet.create({
    tabBarStyle: {
        padding: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    tabContainer: {
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    icon: {
        height: 20,
        width: 20,
        margin: 5,
        tintColor: 'grey'
    },
    label: {
        fontSize: 10,
        color: 'grey'
    }
})