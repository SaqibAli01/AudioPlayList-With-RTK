import { createSlice } from '@reduxjs/toolkit';

import audio1 from '../audio/109.mp3'
import audio2 from '../audio/110.mp3'
import audio3 from '../audio/112.mp3'
import audio4 from '../audio/113.mp3'
import audio5 from '../audio/114.mp3'

//images
import img1 from '../images/kafiroon.jpg'
import img2 from '../images/nsr.jpg'
import img3 from '../images/iklas.png'
import img4 from '../images/surahFlak.png'


const audioPlayerSlice = createSlice({
    name: 'audioPlayer',
    initialState: {
        isPlaying: false,
        currentTrack: 0,
        currentTime: 0,
        duration: 0,
        tracks: [
            {
                title: 'Surah Al-Kafiroon listen',
                desc: 'Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel',
                image: `${img1}`,
                date: Date.now(),
                file: `${audio1}`,
            },
            {
                title: 'Surah An-Nasr listen',
                desc: 'Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel',
                image: `${img2}`,
                date: Date.now(),
                file: `${audio2}`,
            },
            {
                title: 'Surah ikhlas listen',
                desc: 'Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel',
                image: `${img3}`,
                date: Date.now(),
                file: `${audio3}`,
            },
            {
                title: 'Surah Falaq listen',
                desc: 'Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel',
                image: `${img4}`,
                date: Date.now(),
                file: `${audio4}`,
            },
        ],
    },
    reducers: {
        play(state) {
            state.isPlaying = true;
        },
        pause(state) {
            state.isPlaying = false;
        },
        nextTrack(state) {

            state.currentTrack = (state.currentTrack + 1) % state.tracks.length;
            console.log('state.currentTrack', state.currentTrack)
            state.isPlaying = true;
        },

        prevTrack(state) {
            state.currentTrack = state.currentTrack === 0 ? state.tracks.length - 1 : state.currentTrack - 1;
            state.isPlaying = true;
        },

        setCurrentTime(state, action) {

            state.currentTime = Math.floor(action.payload);
        },
        setDuration(state, action) {
            state.duration = Math.floor(action.payload);
        },
        setCurrentTrack(state, action) {
            state.currentTrack = action.payload;
            state.isPlaying = true;
        },
        setIsPlaying(state, action) {
            state.isPlaying = action.payload;
        }
    },

});

export const { play, pause, isPlaying, setIsPlaying, nextTrack, prevTrack, setCurrentTrack, setCurrentTime, setDuration } = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;



















// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     tracks: [
//         {
//             title: 'Surah Al-Kafiroon listen',
//             desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
//             image: 'img1',
//             date: Date.now(),
//             file: 'audio1',
//         },
//         {
//             title: 'Surah An-Nasr listen',
//             desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
//             image: 'img2',
//             date: Date.now(),
//             file: 'audio2',
//         },
//         {
//             title: 'Surah ikhlas listen',
//             desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
//             image: 'img3',
//             date: Date.now(),
//             file: 'audio3',
//         },
//         {
//             title: 'Surah Falaq listen',
//             desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
//             image: 'img4',
//             date: Date.now(),
//             file: 'audio4',
//         },
//     ],
//     currentTrackIndex: 0,
//     isPlaying: false,
//     currentTime: 0,
//     duration: 0,
// };

// const audioPlayerSlice = createSlice({
//     name: 'audioPlayer',
//     initialState,
//     reducers: {
//         play(state) {
//             state.isPlaying = true;
//         },
//         pause(state) {
//             state.isPlaying = false;
//         },
//         nextTrack(state) {
//             state.currentTrackIndex = (state.currentTrackIndex + 1) % state.tracks.length;
//         },
//         prevTrack(state) {
//             state.currentTrackIndex = (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;
//         },
//         setCurrentTime(state, action) {
//             state.currentTime = action.payload;
//         },
//         setDuration(state, action) {
//             state.duration = action.payload;
//         },
//         setCurrentTrack(state, action) {
//             state.currentTrackIndex = action.payload;
//         },
//     },
// });

// export const {
//     play,
//     pause,
//     nextTrack,
//     prevTrack,
//     setCurrentTime,
//     setDuration,
//     setCurrentTrack,
// } = audioPlayerSlice.actions;

// export default audioPlayerSlice.reducer;
