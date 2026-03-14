import { usePlayStore } from "../store/playerStore";

export function CardPlayButton ({id, size='small'}) {
    const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } = usePlayStore(state => state);

    const isPalyingPlaylist = isPlaying && currentMusic.playlist?.id === id;

    const handleClick = () => {
        if (isPalyingPlaylist) {
            setIsPlaying(false);
            return
        }
        fetch(`/api/get-info-playlist.json?id=${id}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data;
                setIsPlaying(true);
                setCurrentMusic({songs, playlist, song: songs[0]})
            })
    }

    const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-6 h-6'

    return (
        <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400">
            {isPalyingPlaylist ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000" class="bi bi-pause-fill" viewBox="0 0 16 16" className={`${iconClassName}`}>
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000" class="bi bi-play-fill" viewBox="0 0 16 16" className={`${iconClassName}`}>
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                </svg>}
        </button>
    )
}