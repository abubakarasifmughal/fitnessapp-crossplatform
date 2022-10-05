import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PlanItem = (
    {
        image,
        title,
        subtitle,
        navigation,
    }: {
        image: any,
        title: string,
        subtitle: string,
        navigation: any,
    }
) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Plan Detail',{title:title})
            }}>
            <ImageBackground
                resizeMode='cover'
                source={image}
                imageStyle={{
                    height: '100%', width: '100%',
                    padding: 10,
                    opacity: 0.3,
                }}
                style={{
                    marginBottom: 20,
                    borderRadius: 10,
                    height: 250, width: "95%",
                    alignSelf: 'center',
                    backgroundColor: 'rgb(220,220,220)',
                    justifyContent: 'flex-end',
                    overflow: 'hidden'
                }}
            >
                <View style={{ margin: 10 }}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: 1
                    }}>{title}</Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: 'white',
                    }}>{subtitle}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default PlanItem

const styles = StyleSheet.create({})