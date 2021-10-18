import { createContext } from "react";

const hasSongQueue = Boolean(localStorage.getItem('queue'))

const initialSong = {
    id: '',
    artist: '',
    title: '',
    duration: 0,
    thumbnail: '',
    url: ''
}

export const SongContext = createContext({
    // song: {
    //     id: '58e1d896-0933-497b-88f8-93115935b19c',
    //     artist: 'Viktor Crabeels',
    //     title: 'cut 0377',
    //     duration: 433.541,
    //     thumbnail: 'https://i1.sndcdn.com/artworks-000380978907-3vz6va-t500x500.jpg'
    // },
    song: JSON.parse(localStorage.getItem('queue')) || initialSong,
    isPlaying: false,
    queuedSongs: hasSongQueue
        ? JSON.parse(localStorage.getItem('queue'))
        : []
});
