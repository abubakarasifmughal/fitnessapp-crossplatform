import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Device } from "react-native-ble-plx";
import { VIDEOSTATUS } from "./VIDEOSTATUS";


// Video Player Floating
const VideoStatusSlice = createSlice({
    name: 'videoStatus',
    initialState: {
        videoStatusState: VIDEOSTATUS.CLOSED
    },
    reducers: {
        maximizeVideo: state => {
            state.videoStatusState = VIDEOSTATUS.MAXIMIZED
        },
        floatVideo: state => {
            state.videoStatusState = VIDEOSTATUS.FLOATING
        },
        closeVideo: state => {
            state.videoStatusState = VIDEOSTATUS.CLOSED
        }
    }
});

export const { maximizeVideo, floatVideo, closeVideo } = VideoStatusSlice.actions
export const VideoStore = configureStore({
    reducer: VideoStatusSlice.reducer,
})

// Video Player Data
const VideoPlayerDataSlice = createSlice({
    name: 'videoPlayerData',
    initialState: {
        playerData: {
            playlist: [], //{playlist:{title:urk}}[]
            activeIndex: 0
        }
    },
    reducers: {
        setPlayerData: (state, action) => {
            state.playerData = action.payload
        }
    }
});

export const { setPlayerData } = VideoPlayerDataSlice.actions
export const VideoPlayerDataStore = configureStore({
    reducer: VideoPlayerDataSlice.reducer
})

const DeviceSlice = createSlice({
    name: "ConnectedDevice",
    initialState: {
        device: undefined
    },
    reducers: {
        setConnectedDeviceAtStore: (state, action) => {
            state.device = action.payload
        }
    }
})

export const { setConnectedDeviceAtStore } = DeviceSlice.actions;
export const ConnectedDeviceStore = configureStore({
    reducer: DeviceSlice.reducer
})
