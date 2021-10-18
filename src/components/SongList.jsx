import { useQuery, useSubscription } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { GET_SONGS } from '../graphql/subscriptions';
import Song from './Song';


const SongList = () => {
    const { loading, error, data } = useSubscription(GET_SONGS);
    // const [songs, setSongs] = useState(data.songs);
    // let songs = []
    // console.log('loading:', loading)
    // console.log('error:', error)
    // console.log('data:', data.songs)

    if (loading) {
        return (
            <div 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 50
                }}
            >
                <CircularProgress />
            </div>
        )
    }

    if (error) return <h2>Error loading songs...</h2>
    return (
        <div>
            <h1>Playlist of Songs:</h1>
            {data.songs.length > 0 
                ? data.songs.map((song, i) => (
                    <Song key={i} song={song} />
                )) : <p>This playlist does not have any songs. Please add some when you are ready.</p>
            }
        </div>
    )
}

export default SongList;
