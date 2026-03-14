import { useEffect, useRef, useState } from "react";
import { usePlayStore } from "../store/playerStore";
import { CurrentSong } from "./CurrentSong";
import { Slider } from "./Slider";
import { VolumeFull, VolumeSilenced } from "../icons/VolumeIcons";

export const SongControl = ({audio}) => {
    const [currentTime, setCurrentTiem] = useState(0)

    useEffect(() => {
        audio.current.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            audio.current.removeEventListener("timeupdate", handleTimeUpdate)
        }
    }, [])

    const handleTimeUpdate = () => {
        setCurrentTiem(audio.current.currentTime)
    }

    const formatTime = time => {
        if (time == null) return "00:00"

        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    const duration = audio?.current?.duration ?? 0

    return (
        <div className="flex gap-x-3 text-xs pt-2">
            <span className="opacity-50 w-12 text-right">
                {formatTime(currentTime)}
            </span>
            <Slider
                defaultValue={[0]}
                value={[currentTime]}
                max={audio?.current?.duration ?? 0}
                min={0}
                className="w-[400px]"
                onValueChange={(value) => {
                    audio.current.currentTime = value
                }}
            />
            <span className="opacity-50 w-12">
                {duration ? formatTime(duration) : '00:00'}
            </span>
        </div>
    )
}

export const VolumeControl = () => {
    const volume = usePlayStore(state => state.volume)
    const setVolume = usePlayStore(state => state.setVolume)
    const previousVolumeRef = useRef(volume)

    const isVolumeSilenced = volume < 0.1

    const handleClickVolume = () => {
        if (isVolumeSilenced) {
            setVolume(previousVolumeRef.current)
        } else {
            previousVolumeRef.current = volume
            setVolume(0)
        }
    }

    return (
        <div className="flex jsutify-center gap-x-4">
            <button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolume}>
                {
                    !isVolumeSilenced < 0.1 ? <VolumeSilenced /> : <VolumeFull />
                }
            </button>
            <Slider
                defaultValue={[100]}
                max={100}
                min={0}
                value={[volume * 100]}
                className="w-[95px]"
                onValueChange={(value) => {
                    const [newValue] = value
                    const volumeValue = newValue / 100
                    setVolume(volumeValue)
                }}
            />
        </div>
    )
}

export function Player() {
    const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayStore(state => state)
    const audioRef = useRef()

    useEffect(() => {
        isPlaying
            ? audioRef.current.play()
            : audioRef.current.pause()
    }, [isPlaying])

    useEffect(() => {
        audioRef.current.volume = volume
    }, [volume])

    useEffect(() => {
        // audioRef.current.src = `/music/1/01.mp3`;
        const { song, songs, playlist } = currentMusic
        if (song) {
            const src = `/music/${playlist.id}/0${song.id}.mp3`
            audioRef.current.src = src
            audioRef.current.volume = volume
            audioRef.current.play()
        }
    }, [currentMusic])

    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
    <div className="flex flex-row justify-between w-full">
        <div className="w-[200px]">
            <CurrentSong {...currentMusic.song} />
        </div>

        <div className="grid place-content-center gap-4 flex-1">
            <div className="flex justify-content flex-col items-center">
                <button
                    className="bg-white rounded-full p-2"
                    onClick={handleClick}
                    >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000" class="bi bi-pause-fill" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>
                    )}
                </button>
                <SongControl audio={audioRef} />
                <audio ref={audioRef} />
            </div>
        </div>

        <div className="grid place-content-center">
            <VolumeControl />
        </div>
    </div>
    );
}
