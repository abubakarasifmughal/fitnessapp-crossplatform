import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Pressable, Modal, ScrollView } from 'react-native'
import React, { SetStateAction, useEffect, useRef, useState, } from 'react'
import DraggableView from 'react-native-draggable-reanimated';
import { VIDEOSTATUS } from '../shared/VIDEOSTATUS';
import { closeVideo, floatVideo, maximizeVideo, setPlayerData, VideoPlayerDataStore, VideoStore } from '../shared/store';
import LabledVideoComponents from './LabledVideoComponents';

import YoutubeIframe, { YoutubeIframeRef } from 'react-native-youtube-iframe';


const { height, width } = Dimensions.get('screen')

const FLOATING_VIDEO_HEIGHT = 160;
const FLOATING_VIDEO_WIDTH = 250;

const MAXIMIZED_VIDEO_HEIGHT = 220;

const VideoComponent = () => {

    const [PipEnabled, setPipEnabled] = useState(VideoStore.getState().videoStatusState)
    const [VideoPlayerData, setVideoPlayerData] = useState<{
        activeIndex: number,
        playlist: any[]
    }>(
        {
            activeIndex: 0,
            playlist: []
        }
    )
    const [YTLoaded, setYTLoaded] = useState(false)
    const [TimeToSeekOn, setTimeToSeekOn] = useState(0)

    VideoStore.subscribe(() => {
        setPipEnabled(VideoStore.getState().videoStatusState)
    })
    VideoPlayerDataStore.subscribe(() => {
        setVideoPlayerData(VideoPlayerDataStore.getState().playerData)
    })

    const onPressHandler = (index: number) => {
        VideoStore.dispatch(maximizeVideo())
        VideoPlayerDataStore.dispatch(setPlayerData({
            playlist: VideoPlayerData.playlist,
            activeIndex: index
        }))
    }

    const ExtractVideoID = (URL: string) => {
        return URL.split("=")[URL.split('=').length - 1]
    }

    const YTRef = useRef<YoutubeIframeRef>()


    function VIDEO_AND_LOADER(YTLoaded: boolean, VideoPlayerData: { activeIndex: number; playlist: any[]; }, YTRef: React.MutableRefObject<YoutubeIframeRef | undefined>, ExtractVideoID: (URL: string) => string, setYTLoaded: React.Dispatch<React.SetStateAction<boolean>>) {
        return <>
            {
                !YTLoaded &&
                <View style={{ height: MAXIMIZED_VIDEO_HEIGHT, backgroundColor: 'black', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 50 }}>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', letterSpacing: 1 }}>BackAware</Text>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '400', letterSpacing: 1 }}>Loading video</Text>
                </View>
            }
            {
                VideoPlayerData.playlist.length !== 0 &&
                <YoutubeIframe
                    height={YTLoaded ? MAXIMIZED_VIDEO_HEIGHT : 0}
                    width={width}
                    ref={YTRef}
                    contentScale={1}
                    play={true}
                    videoId={ExtractVideoID(VideoPlayerData.playlist[VideoPlayerData.activeIndex].url)}
                    webViewStyle={{ backgroundColor: 'black' }}
                    onReady={() => {
                        setTimeout(() => {
                            YTRef.current?.seekTo(TimeToSeekOn, true)
                            setYTLoaded(true);
                        }, 1000);
                    }}
                />
            }
        </>;
    }

    return (

        <>
            <Modal visible={PipEnabled === VIDEOSTATUS.MAXIMIZED} animationType='slide'>
                <SafeAreaView style={{ backgroundColor: 'black', height: height }}>
                    {VIDEO_AND_LOADER(YTLoaded, VideoPlayerData, YTRef, ExtractVideoID, setYTLoaded)}

                    <View style={{ flexDirection: 'row-reverse', backgroundColor: 'white', alignItems: 'center' }}>
                        <TouchableOpacity style={{ margin: 10 }}
                            onPress={() => {
                                YTRef.current?.getCurrentTime().then(time => {
                                    setTimeToSeekOn(time)
                                    VideoStore.dispatch(floatVideo())
                                })
                            }}>
                            <Image source={require('../../assets/dark_layers.png')}
                                style={{ height: 30, width: 30, }}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        <Text style={{ flex: 1, paddingLeft: 15, paddingRight: 15, fontSize: 17, fontWeight: '500' }}>{VideoPlayerData.playlist.length !== 0 ? VideoPlayerData.playlist[VideoPlayerData.activeIndex].title : ""}</Text>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: 'rgb(240,240,240)', }} />
                    <ScrollView style={{
                        flex: 1, backgroundColor: 'white',
                        padding: 10,
                    }}>
                        {
                            VideoPlayerData.playlist.map((data, index) => (
                                <LabledVideoComponents key={index}
                                    PressHandler={() => {
                                        onPressHandler(index)
                                    }}
                                    title={data.title}
                                    url={data.url}
                                />
                            ))
                        }
                    </ScrollView>

                    <TouchableOpacity
                        onPress={() => {
                            VideoStore.dispatch(closeVideo())
                        }} style={[styles.metroButtonBlackExtended]}>
                        <Text style={styles.ButtonText}>Close Video</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>

            {
                (PipEnabled == VIDEOSTATUS.FLOATING && (PipEnabled != VIDEOSTATUS.CLOSED)) &&
                <SafeAreaView style={{ position: 'absolute' }}>
                    <DraggableView initValue={{ x: width - FLOATING_VIDEO_WIDTH - 10, y: height - FLOATING_VIDEO_HEIGHT - 50 }}>
                        <Pressable onPress={() => {
                            VideoStore.dispatch(maximizeVideo())
                        }}>
                            {
                                !YTLoaded &&
                                <View style={{
                                    backgroundColor: 'black',
                                    width: FLOATING_VIDEO_WIDTH,
                                    height: FLOATING_VIDEO_HEIGHT,
                                    shadowColor: 'black',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 1,
                                    shadowRadius: 5,
                                    elevation: 10,
                                    padding: 18,
                                    justifyContent: 'flex-end'
                                }}>
                                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', letterSpacing: 1 }}>BackAware</Text>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '400', letterSpacing: 1 }}>Loading video</Text>
                                </View>
                            }
                            {
                                VideoPlayerData.playlist.length !== 0 &&
                                <View style={{
                                    backgroundColor: 'red',
                                    shadowColor: 'black',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 1,
                                    shadowRadius: 5,
                                    elevation: 10
                                }}>
                                    <YoutubeIframe
                                        height={YTLoaded ? FLOATING_VIDEO_HEIGHT - 20 : 0}
                                        width={FLOATING_VIDEO_WIDTH}
                                        ref={YTRef}
                                        contentScale={1}
                                        play={true}
                                        videoId={ExtractVideoID(VideoPlayerData.playlist[VideoPlayerData.activeIndex].url)}
                                        webViewStyle={{ backgroundColor: 'black', }}
                                        onReady={() => {
                                            setTimeout(() => {
                                                setYTLoaded(true);
                                                YTRef.current?.seekTo(TimeToSeekOn, true)
                                            }, 1000);
                                        }}
                                    />
                                </View>
                            }
                        </Pressable>
                    </DraggableView>
                </SafeAreaView>
            }
        </>
    )
}

export default VideoComponent

const styles = StyleSheet.create({
    metroButtonBlackExtended: {
        backgroundColor: 'red', paddingTop: 10, paddingBottom: 10,
        borderRadius: 5, alignSelf: 'center', width: '80%', marginTop: 20, marginBottom: 10
    },
    ButtonText: { color: 'white', fontWeight: '500', fontSize: 18, textAlign: 'center' },
})

