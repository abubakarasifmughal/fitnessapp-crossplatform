import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Pressable } from 'react-native'
import React, { SetStateAction, useState, } from 'react'
import DraggableView from 'react-native-draggable-reanimated';
import { VIDEOSTATUS } from '../shared/VIDEOSTATUS';

const { height, width } = Dimensions.get('screen')

const VIDEO_HEIGHT = 120;
const VIDEO_WIDTH = 200;

const VideoComponent = () => {
    const [PipEnabled, setPipEnabled] = useState(VIDEOSTATUS.SHOWN)
    return PipEnabled != VIDEOSTATUS.CLOSED ? (
        PipEnabled == VIDEOSTATUS.SHOWN ? (
            <SafeAreaView style={{ position: 'absolute', backgroundColor: 'rgba(200,200,200,0.5)', top: 0, left: 0, right: 0, bottom: 0, }}>
                <View style={{ height: 350, backgroundColor: 'black' }} />
                <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row-reverse' }}>
                    <TouchableOpacity style={{ margin: 10 }}
                        onPress={() => {
                            setPipEnabled(VIDEOSTATUS.FLOAT)
                        }}>
                        <Image source={require('../../assets/dark_layers.png')}
                            style={{ height: 30, width: 30, }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setPipEnabled(VIDEOSTATUS.CLOSED)
                    }} style={[styles.metroButtonBlackExtended, { marginBottom: 15 }]}>
                    <Text style={styles.ButtonText}>Close Video</Text>
                </TouchableOpacity>
            </SafeAreaView>
        ) : (
            <SafeAreaView style={{ position: 'absolute' }}>
                <DraggableView
                    initValue={{ x: width - VIDEO_WIDTH - 10, y: height - VIDEO_HEIGHT - 50 }}
                    maxHeight={height}
                    maxWidth={width}
                >
                    <Pressable onPress={() => {
                        setPipEnabled(VIDEOSTATUS.SHOWN)

                    }}>
                        <View
                            style={{
                                backgroundColor: 'black',
                                width: VIDEO_WIDTH,
                                height: VIDEO_HEIGHT,
                                shadowColor: 'black',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 5,
                                elevation: 10
                            }}
                        />
                    </Pressable>
                </DraggableView>
            </SafeAreaView>
        )
    ) : null
}

export default VideoComponent

const styles = StyleSheet.create({
    metroButtonBlackExtended: {
        backgroundColor: 'black', paddingTop: 10, paddingBottom: 10, width: "80%",
        marginTop: 30, borderRadius: 5, alignSelf: 'center', position: 'absolute', bottom: 40
    },
    ButtonText: { color: 'white', fontWeight: '600', fontSize: 18, textAlign: 'center' },
})