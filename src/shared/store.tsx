import { configureStore, createSlice } from "@reduxjs/toolkit";

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