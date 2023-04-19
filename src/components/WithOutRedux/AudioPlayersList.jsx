import React, { useState, useRef, useEffect } from "react";
import "./styleBe.css";
import audio1 from "../audio/109.mp3";
import audio2 from "../audio/110.mp3";
import audio3 from "../audio/112.mp3";
import audio4 from "../audio/113.mp3";
import audio5 from "../audio/114.mp3";

//images
import img1 from "../images/kafiroon.jpg";
import img2 from "../images/nsr.jpg";
import img3 from "../images/iklas.png";
import img4 from "../images/surahFlak.png";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  const tracks = [
    {
      title: "Surah Al-Kafiroon listen",
      desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
      image: `${img1}`,
      date: Date.now(),
      file: `${audio1}`,
    },
    {
      title: "Surah An-Nasr listen",
      desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
      image: `${img2}`,
      date: Date.now(),
      file: `${audio2}`,
    },
    {
      title: "Surah ikhlas listen",
      desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
      image: `${img3}`,
      date: Date.now(),
      file: `${audio3}`,
    },
    {
      title: "Surah Falaq listen",
      desc: "Listen to Surah Falaq in the voice of Sheikh Abdallah Kamel",
      image: `${img4}`,
      date: Date.now(),
      file: `${audio4}`,
    },
  ];

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleNextTrack = () => {
    const nextTrack = currentTrack === tracks.length - 1 ? 0 : currentTrack + 1;
    setCurrentTrack(nextTrack);
    audioRef.current.src = tracks[nextTrack].file;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    const prevTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevTrack);
    audioRef.current.src = tracks[prevTrack].file;
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", () => {
      // setCurrentTime(audioRef.current.currentTime);
      // setDuration(audioRef.current.duration);

      setCurrentTime(Math.floor(audioRef.current.currentTime));
      setDuration(Math.floor(audioRef.current.duration));
    });
  }, []);

  const handleProgressClick = (event) => {
    const { duration } = audioRef.current;
    const { offsetX } = event.nativeEvent;
    const progress = offsetX / event.target.clientWidth;
    audioRef.current.currentTime = duration * progress;
  };

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
            <span id="npAction">{isPlaying ? "Playing..." : "Paused..."}</span>
            <span id="npTitle">{tracks[currentTrack].title}</span>
          </div>

          <div id="audiowrap">
            <div className="img">
              <div className="img_clr">
                <img
                  src={tracks[currentTrack].image}
                  alt="image"
                  ref={audioRef}
                />
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
                <button onClick={handlePause}>
                  <i class="fa-sharp fa-solid fa-stop"></i>
                </button>
              ) : (
                <button onClick={handlePlay}>
                  <i class="fa-sharp fa-solid fa-play"></i>
                </button>
              )}
              <button onClick={handleNextTrack}>&rarr;</button>
            </div>
          </div>

          <div id="plwrap">
            <ul id="plList">
              {tracks.map((track, index) => (
                <li
                  key={index}
                  className={index === currentTrack ? "current" : ""}
                >
                  <button
                    id="btn"
                    onClick={() => {
                      setCurrentTrack(index);
                      audioRef.current.src = track.file;
                      audioRef.current.play();
                      setIsPlaying(true);
                    }}
                  >
                    <div className="arrList">
                      <h2 style={{ paddingRight: "20px" }}>{index + 1}</h2>
                      <div>
                        <h3> {track.title}</h3>
                        <p>{track.desc}</p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
