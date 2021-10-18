import { useQuery } from '@apollo/client'
import { Card, CardContent, CardMedia, duration, IconButton, makeStyles, Slider, Typography } from '@material-ui/core'
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { SongContext } from '../context'
import QueuedSongList from './QueuedSongList'


// const DEFAULT_DIALOG_IMAGE = 'https://i1.sndcdn.com/artworks-zrKkVoMVvSqy6KZH-KUhdyg-t500x500.jpg'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px'
    },
    content: {
        flex: '1 0 auto'
    },
    thumbnail: {
        width: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    playIcon: {
        height: 38, width: 38
    }
}))

const SongPlayer = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(SongContext);
    const [songPlayed, setSongPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [durationPlayed, setDurationPlayed] = useState(0);
    const [positionInQueue, setPositionInQueue] = useState(0);
    const reactPlayerRef = useRef();

    useEffect(() => {
        const i = state.queuedSongs.findIndex(song => song.id === state.song.id);
        setPositionInQueue(i);
    }, [state.queuedSongs, state.song.id])

    useEffect(() => {
        const nextQueuedSong = state.queuedSongs[positionInQueue + 1];
        if (songPlayed >= 0.99 && nextQueuedSong) {
            setSongPlayed(0);
            dispatch({ type: 'SET_SONG', payload: { song: nextQueuedSong } })
        }
    }, [state.queuedSongs, songPlayed, dispatch, positionInQueue])

    const handleToggleSong = () => {
        if (state.isPlaying) {
            dispatch({ type: 'PAUSE_SONG' })
        } else {
            dispatch({ type: 'PLAY_SONG' })
        }
    }

    const handleSliderProgressChange = (e, newValue) => {
        console.log('is changing', e, newValue)
        setSongPlayed(newValue)
    }

    const handleSeekMouseDown = () => {
        setSeeking(true);
    }

    const handleSeekMouseUp = () => {
        setSeeking(false);
        reactPlayerRef.current.seekTo(songPlayed)
    }

    const formatDurationPlayed = seconds => {
        return new Date(seconds * 1000).toISOString().substr(11, 8)
    }

    const handlePlayPreviousSong = () => {
        const prevousQueuedSong = state.queuedSongs[positionInQueue - 1];
        console.log('previous song?', prevousQueuedSong)
        if (prevousQueuedSong) {
            setSongPlayed(0);
            dispatch({ type: 'SET_SONG', payload: { song: prevousQueuedSong } })
        }
    }

    const handlePlayNextSong = () => {
        const nextQueuedSong = state.queuedSongs[positionInQueue + 1];
        console.log('previous song?', nextQueuedSong)
        if (nextQueuedSong) {
            setSongPlayed(0);
            dispatch({ type: 'SET_SONG', payload: { song: nextQueuedSong } })
        }
    }

    return (
        <>
            {/* <h2>Song Player:</h2> */}
            <Card className={classes.container} variant="outlined">
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant='h5' component='h3'>
                            {state.song.title}
                        </Typography>
                        <Typography variant='subtitle1' component='p' color='textSecondary'>
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton onClick={handlePlayPreviousSong}>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton>
                            {state.isPlaying
                                ? <Pause className={classes.playIcon} onClick={handleToggleSong} />
                                : <PlayArrow className={classes.playIcon} onClick={handleToggleSong} />
                            }

                        </IconButton>
                        <IconButton onClick={handlePlayNextSong}>
                            <SkipNext />
                        </IconButton>
                        <Typography variant='subtitle1' component='p' color='textSecondary'>
                            {formatDurationPlayed(durationPlayed)}
                        </Typography>
                    </div>
                    <Slider
                        onChange={handleSliderProgressChange}
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                        value={songPlayed}
                        type='range'
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                <ReactPlayer
                    ref={reactPlayerRef}
                    onProgress={({ played, playedSeconds }) => {
                        if (!seeking) {
                            setSongPlayed(played)
                            setDurationPlayed(playedSeconds)
                        }
                    }}
                    url={state.song.url}
                    playing={state.isPlaying}
                    hidden
                />
                <CardMedia
                    className={classes.thumbnail}
                    image={state.song.thumbnail}
                />
            </Card>
            {/* <QueuedSongList songQueue={ data } /> */}
            <QueuedSongList />
        </>
    )
}

export default SongPlayer
