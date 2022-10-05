import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const TrainingItem = (
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
                navigation.navigate('Trainings Detail',{title:title})
            }}
        >
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
                <View style={{ padding: 10, backgroundColor: 'rgb(50,50,50)', }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: 5
                    }}>{title}</Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: 'white',
                    }}>{subtitle}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default TrainingItem

const styles = StyleSheet.create({})