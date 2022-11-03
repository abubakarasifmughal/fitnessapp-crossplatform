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

const LowerLimitSlice = createSlice({
    name: 'LowerLimit',
    initialState: {
        value: 0
    },
    reducers: {
        setLowerLimit: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setLowerLimit } = LowerLimitSlice.actions;
export const LowerLimitStore = configureStore({
    reducer: LowerLimitSlice.reducer
})

const UpperLimitSlice = createSlice({
    'name': 'UpperLimit',
    initialState: {
        value: 0
    },
    reducers: {
        setUpperLimit: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setUpperLimit } = UpperLimitSlice.actions;
export const UpperLimitStore = configureStore({
    reducer: UpperLimitSlice.reducer
})


// Hard

const Hard_LowerLimitSlice = createSlice({
    name: 'Hard_LowerLimit',
    initialState: {
        value: 0
    },
    reducers: {
        setHard_LowerLimit: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setHard_LowerLimit } = Hard_LowerLimitSlice.actions;
export const Hard_LowerLimitStore = configureStore({
    reducer: Hard_LowerLimitSlice.reducer
})

const Hard_UpperLimitSlice = createSlice({
    'name': 'Hard_UpperLimit',
    initialState: {
        value: 0
    },
    reducers: {
        setHard_UpperLimit: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setHard_UpperLimit } = Hard_UpperLimitSlice.actions;
export const Hard_UpperLimitStore = configureStore({
    reducer: UpperLimitSlice.reducer
})
// Normal

const Normal_LowerLimitSlice = createSlice({
    name: 'Normal_LowerLimit',
    initialState: {
        value: 0
    },
    reducers: {
        setNormal_LowerLimit: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setNormal_LowerLimit } = Normal_LowerLimitSlice.actions;
export const Normal_LowerLimitStore = configureStore({
    reducer: Normal_LowerLimitSlice.reducer
})

const Normal_UpperLimitSlice = createSlice({
    'name': 'Normal_UpperLimit',
    initialState: {
        value: 0
    },
    reducers: {
        setNormal_UpperLimit: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setNormal_UpperLimit } = Normal_UpperLimitSlice.actions;
export const Normal_UpperLimitStore = configureStore({
    reducer: UpperLimitSlice.reducer
})