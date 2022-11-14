import { configureStore, createSlice } from "@reduxjs/toolkit";
import { LimitTypes } from "./LimitTypes";

const ConnectedDeviceSlice = createSlice({
    name: 'ConnectedDevice',
    initialState: {
        device: ""
    },
    reducers: {
        setConnectedDeviceInStore: (state, action) => {
            state.device = action.payload
        },
        clearConnectedDeviceInStore: (state) => {
            state.device = ""
        }
    }
})
export const { setConnectedDeviceInStore, clearConnectedDeviceInStore } = ConnectedDeviceSlice.actions;
export const ConnectedDeviceStore = configureStore({
    reducer: ConnectedDeviceSlice.reducer
});

const DeviceServicesSlice = createSlice({
    name: 'DeviceServices',
    initialState: {
        services: ""
    },
    reducers: {
        setDeviceServices: (state, action) => {
            state.services = action.payload
        },
        clearDeviceServices: (state) => {
            state.services = ""
        }
    }
})
export const { setDeviceServices, clearDeviceServices } = DeviceServicesSlice.actions
export const DeviceServicesStore = configureStore({
    reducer: DeviceServicesSlice.reducer,
})

const DeviceCharacteristicsSlice = createSlice({
    name: 'DeviceCharacteristics',
    initialState: {
        characteristics: ""
    },
    reducers: {
        setDeviceCharacteristics: (state, action) => {
            state.characteristics = action.payload
        },
        clearDeviceCharacteristics: (state) => {
            state.characteristics = ""
        }
    }
})
export const { setDeviceCharacteristics, clearDeviceCharacteristics } = DeviceCharacteristicsSlice.actions;
export const DeviceCharacteristicsStore = configureStore({
    reducer: DeviceCharacteristicsSlice.reducer
})

const LimitsSlice = createSlice({
    name: "Limits",
    initialState: {
        hardUpperLimit: 100,
        hardLowerLimit: 100,
        normalUpperLimit: 200,
        normalLowerLimit: 200,
        manualUpperLimit: 0,
        manualLowerLimit: 0,
        whichOneToBeFollowed: LimitTypes.NONE
    },
    reducers: {
        setHardUpperLimit: (state, action) => {
            state.hardUpperLimit = action.payload
        },
        setHardLowerLimit: (state, action) => {
            state.hardLowerLimit = action.payload
        },
        setNormalUpperLimit: (state, action) => {
            state.normalUpperLimit = action.payload
        },
        setNormalLowerLimit: (state, action) => {
            state.normalLowerLimit = action.payload
        },
        setManualUpperLimit: (state, action) => {
            state.manualUpperLimit = action.payload
        },
        setManualLowerLimit: (state, action) => {
            state.manualLowerLimit = action.payload
        },
        setWhichOneToBeFollowed: (state, action) => {
            state.whichOneToBeFollowed = action.payload
        }
    }
})

export const {
    setHardLowerLimit,
    setHardUpperLimit,
    setManualLowerLimit,
    setManualUpperLimit,
    setNormalLowerLimit,
    setNormalUpperLimit,
    setWhichOneToBeFollowed
} = LimitsSlice.actions

export const LimitStore = configureStore({
    reducer: LimitsSlice.reducer
})