import { useMutation } from '@apollo/client';
import { Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Delete, Pause, PlayArrow, PlaylistAddCheck, QueueMusic, Save, SaveAlt } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { SongContext } from '../context';

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(2)
    },
    songInfoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    songInfo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail: {
        objectFit: 'cover',
        width: 140,
        height: 140
    }
}));

const Song = ({ song }) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(SongContext);
    const { artist, title, thumbnail } = song;
    const [songPlaying, setSongPlaying] = useState(false);

    useEffect(() => {
        const isSongPlaying = state.isPlaying && song.id === state.song.id;
        setSongPlaying(isSongPlaying);
    }, [song.id, state.song.id, state.isPlaying]);

    useEffect(() => {
        // const inQueue = state.queuedSongs.includes(song)
        // console.log('in queue?', inQueue)
    }, [state.queuedSongs])

    const handleToggleSong = () => {
        dispatch({ type: 'SET_SONG', payload: { song } })
        if (state.isPlaying && song.id !== state.song.id) {
            dispatch({ type: 'PLAY_SONG ' })
        } else if (state.isPlaying) {
            dispatch({ type: 'PAUSE_SONG' })
        } else {
            dispatch({ type: 'PLAY_SONG' })
        }
    }


    // const showSongPlayingStatus = () => {
    //     // How I implemented toggling the song's play/pause icon:
    //     if (song.id === state.song.id) {
    //         return state.isPlaying ? <Pause /> : <PlayArrow />; 
    //     } else {
    //         return <PlayArrow />
    //     }
    // }

    const handleSongQueue = () => {
        // console.log('queued songs?', state.queuedSongs, 'song:', state.song)
        // state.queuedSongs.push(state.song);
        // localStorage.setItem('queudSongs', JSON.stringify({ ...state.queuedSongs, song }))
        // console.log('queuedSongs:', JSON.parse(localStorage.getItem('queuedSongs')));

        dispatch({ type: 'ADD_SONG_TO_QUEUE', payload: { song } })
        localStorage.setItem('queue', JSON.stringify(state.queuedSongs));

    }

    const inQueue = state.queuedSongs.includes(song)
    console.log('in queue?', inQueue)

    return (
        <Card className={classes.container}>
            <div className={classes.songInfoContainer}>
                <CardMedia className={classes.thumbnail} image={thumbnail} />
                <div className={classes.songInfo}>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {artist}
                        </Typography>
                        <Typography variant='body1' component='p' color="textSecondary">
                            {title}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={handleToggleSong} size='small' color='primary'>
                            {/* {showSongPlayingStatus()} */}
                            {songPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        {!inQueue
                            ? (<IconButton onClick={handleSongQueue} size='small' color='secondary'>
                                {/* <Save /> */}
                                <QueueMusic />
                            </IconButton>)
                            : (<IconButton size='small' disabled>
                                {/* <QueueMusic /> */}
                                {/* <Save /> */}
                                <PlaylistAddCheck />
                            </IconButton>)
                        }
                    </CardActions>
                </div>
                {/* <img src={thumbnail} alt='song thumbnail' style={{ height: 75 }} /> */}
            </div>
        </Card>
    )
}

export default Song;
