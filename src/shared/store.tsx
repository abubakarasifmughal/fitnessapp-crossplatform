import { configureStore, createSlice } from "@reduxjs/toolkit";
import { VIDEOSTATUS } from "./VIDEOSTATUS";

const VideoStatusSlice = createSlice({
    name: 'videoStatus',
    initialState: {
        videoStatusState: VIDEOSTATUS.MAXIMIZED
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


export const {maximizeVideo, floatVideo, closeVideo} = VideoStatusSlice.actions

export const store = configureStore({
    reducer: VideoStatusSlice.reducer
})

store.subscribe(() => {
    console.log("NEW STATE IS");
    console.log(store.getState());  
})