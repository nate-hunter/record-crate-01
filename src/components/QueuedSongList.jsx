import { Typography, useMediaQuery } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { SongContext } from '../context';
import QueuedSong from './QueuedSong';



const defaultSong = {
    // title: 'like we were the last two people on earth',
    title: 'test',
    artist: 'dj poolboi',
    thumbnail: 'https://i1.sndcdn.com/artworks-zrKkVoMVvSqy6KZH-KUhdyg-t500x500.jpg'
}

const QueuedSongList = ({ songQueue }) => {
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
    const { state } = useContext(SongContext);
    const { queuedSongs } = state;


    // const [storedSongQueue, setStoredSongQueue] = useState(JSON.parse(localStorage.getItem('queue')));
    // const [storedSongQueue, setStoredSongQueue] = useState(queuedSongs);

    // console.log('sq1:', storedSongQueue);
    // console.log('queuedSongs1:', queuedSongs);
    // console.log('ls:', JSON.parse(localStorage.getItem('queue')))

    // useEffect(() => {
    //     setStoredSongQueue(JSON.parse(localStorage.getItem('queue')))
    // }, [queuedSongs])

    // console.log('sq2:', storedSongQueue);
    // console.log('queuedSongs2:', queuedSongs);

    return (
        greaterThanMd && (
            <div style={{
                margin: '10 10'
            }}>
                <h2 onClick={() => console.log('queued songs?', songQueue)}>Queued Songs:</h2>
                <Typography color="textSecondary" variant="button">
                    Queue ({queuedSongs.length > 0 ? queuedSongs.length : 0})
                </Typography>
                {queuedSongs && queuedSongs.map(song => (
                    <QueuedSong key={song.id} song={song} />
                ))}
                {/* {Array.from({ length: 7 }, () => defaultSong).map((song, i) => (
                    <QueuedSong key={i} song={song} />
                ))} */}
            </div>
        )
    )
}

export default QueuedSongList;
