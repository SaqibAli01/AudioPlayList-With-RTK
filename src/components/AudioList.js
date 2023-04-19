import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    play, pause, nextTrack, prevTrack, setCurrentTime,
    setDuration, setCurrentTrack, setIsPlaying
} from '../reduxSlice/audioSlice';



import './styles.css'




function AudioPlayer() {

    // const [isPlaying, setIsPlaying] = useState(false);
    // const [currentTrack, setCurrentTrack] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    // const [duration, setDuration] = useState(0);
    // // const audioRef = useRef();

    //-----------------------------------------------------------------------------------------------------------------
    const dispatch = useDispatch();
    const { isPlaying, currentTrack, currentTime, duration, tracks } = useSelector((state) => state.audioPlayer);
    const audioRef = useRef();

    const handlePlay = () => {
        audioRef.current.play();
        dispatch(play());
    };

    const handlePause = () => {
        audioRef.current.pause();
        dispatch(pause());
    };

    const handleNextTrack = () => {
        dispatch(nextTrack());
        audioRef.current.src = tracks[currentTrack + 1].file;
        audioRef.current.play();
    };

    function handleTrackClick(trackIndex) {
        console.log("trackIndex", trackIndex)
        dispatch(setCurrentTrack(trackIndex));
    }


    const handlePrevTrack = () => {
        dispatch(prevTrack());
        audioRef.current.src = tracks[currentTrack + 1].file;
        audioRef.current.play();
    };

    function handleTrackClick(trackIndex) {
        dispatch(setCurrentTrack(trackIndex));
    }

    useEffect(() => {
        audioRef.current.addEventListener('timeupdate', () => {
            dispatch(setCurrentTime(Math.floor(audioRef.current.currentTime)));
            dispatch(setDuration(Math.floor(audioRef.current.duration)));
        });
    }, [dispatch]);

    const handleProgressClick = (event) => {
        const { duration } = audioRef.current;
        const { offsetX } = event.nativeEvent;
        const progress = offsetX / event.target.clientWidth;
        const newCurrentTime = duration * progress;

        audioRef.current.currentTime = newCurrentTime;
        dispatch(setCurrentTime(newCurrentTime));
    };







    // const tracks = [
    //     {
    //         title: 'Surah Al-Kafiroon listen',
    //         desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
    //         image: `${img1}`,
    //         date: Date.now(),
    //         file: `${audio1}`,
    //     },
    //     {
    //         title: 'Surah An-Nasr listen',
    //         desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
    //         image: `${img2}`,
    //         date: Date.now(),
    //         file: `${audio2}`,
    //     },
    //     {
    //         title: 'Surah ikhlas listen',
    //         desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
    //         image: `${img3}`,
    //         date: Date.now(),
    //         file: `${audio3}`,
    //     },
    //     {
    //         title: 'Surah Falaq listen',
    //         desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
    //         image: `${img4}`,
    //         date: Date.now(),
    //         file: `${audio4}`,
    //     },
    // ];

    // const handlePlay = () => {
    //     audioRef.current.play();
    //     setIsPlaying(true);
    // };

    // const handlePause = () => {
    //     audioRef.current.pause();
    //     setIsPlaying(false);
    // };

    // const handleNextTrack = () => {
    //     const nextTrack = currentTrack === tracks.length - 1 ? 0 : currentTrack + 1;
    //     setCurrentTrack(nextTrack);
    //     audioRef.current.src = tracks[nextTrack].file;
    //     audioRef.current.play();
    //     setIsPlaying(true);
    // };

    // const handlePrevTrack = () => {
    //     const prevTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    //     setCurrentTrack(prevTrack);
    //     audioRef.current.src = tracks[prevTrack].file;
    //     audioRef.current.play();
    //     setIsPlaying(true);
    // };

    // useEffect(() => {
    //     audioRef.current.addEventListener('timeupdate', () => {
    //         // setCurrentTime(audioRef.current.currentTime);
    //         // setDuration(audioRef.current.duration);

    //         setCurrentTime(Math.floor(audioRef.current.currentTime));
    //         setDuration(Math.floor(audioRef.current.duration));
    //     });
    // }, []);

    // const handleProgressClick = (event) => {
    //     const { duration } = audioRef.current;
    //     const { offsetX } = event.nativeEvent;
    //     const progress = offsetX / event.target.clientWidth;
    //     audioRef.current.currentTime = duration * progress;
    // };


    // const formatTime = (time) => {
    //     const minutes = Math.floor(time / 60);
    //     const seconds = Math.floor(time % 60);
    //     return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    // };


    return (
        <div className="container">
            <div className="column add-bottom">
                <div id="mainwrap">
                    <div id="nowPlay">
                        <span id="npAction">{isPlaying ? 'Playing...' : 'Paused...'}</span>
                        <span id="npTitle">{tracks[currentTrack].title}</span>
                    </div>


                    <div id="audiowrap">

                        <div className='img'>
                            <div className='img_clr'>
                                <img src={tracks[currentTrack].image} alt="image" ref={audioRef} />

                            </div>

                        </div>

                        <div id="nowPlay">
                            <span id="npAction">{currentTime}</span>
                            <span id="npTitle">{duration}</span>
                        </div>

                        <div id="progress" onClick={handleProgressClick}>

                            <div
                                id="progress-filled"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            ></div>
                        </div>

                        <div id="audio0">
                            <audio id="audio1" preload="auto" ref={audioRef}>
                                <source src={tracks[currentTrack].file} type="audio/mpeg" />
                            </audio>
                        </div>
                        <div id="tracks">
                            <button onClick={handlePrevTrack}>&larr;</button>
                            {isPlaying ? (
                                <button onClick={handlePause}><i className="fa-sharp fa-solid fa-stop"></i></button>
                            ) : (
                                <button onClick={handlePlay}><i className="fa-sharp fa-solid fa-play"></i></button>
                            )}
                            <button onClick={handleNextTrack}>&rarr;</button>
                        </div>


                    </div>

                    <div id="plwrap">
                        <ul id="plList">


                            {tracks.map((track, index) => (
                                <li key={index} className={index === currentTrack ? 'current' : ''}>
                                    <button id='btn'
                                        onClick={() => {
                                            handleTrackClick(index); // Dispatching setCurrentTrack here
                                            audioRef.current.src = track.file;
                                            audioRef.current.play();
                                            setIsPlaying(true);
                                        }}

                                    >
                                        <div className='arrList'>
                                            <h2 style={{ paddingRight: "20px" }}>{index + 1}</h2>
                                            <div>
                                                <h3> {track.title}</h3>
                                                <p>{track.desc}</p>
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))}

                            {/* {tracks.map((track, index) => (
                                <li key={index} className={index === currentTrack ? 'current' : ''}>
                                    <button id='btn' onClick={() => {
                                        setCurrentTrackS(index);
                                        audioRef.current.src = track.file;
                                        audioRef.current.play();
                                        dispatch(isPlaying(true));
                                    }}>
                                        <div className='arrList'>
                                            <h2 style={{ paddingRight: "20px" }}>{index + 1}</h2>
                                            <div>
                                                <h3> {track.title}</h3>
                                                <p>{track.desc}</p>
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))} */}



                            {/* {tracks.map((track, index) => (
                                <li key={index} className={index === currentTrack ? 'current' : ''}>
                                    <button id='btn' onClick={() => {
                                        setCurrentTrack(index);
                                        audioRef.current.src = track.file;
                                        audioRef.current.play();
                                        setIsPlaying(true);
                                    }}>
                                        <div className='arrList'>
                                            <h2 style={{ paddingRight: "20px" }}>{index + 1}</h2>
                                            <div>
                                                <h3> {track.title}</h3>
                                                <p>{track.desc}</p>
                                            </div>
                                        </div>

                                    </button>
                                </li>
                            ))} */}
                        </ul>
                    </div>

                </div>
            </div>

        </div >
    );
}

export default AudioPlayer;
