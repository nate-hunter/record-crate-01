import { Avatar, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Delete, RemoveFromQueue, RemoveFromQueueTwoTone } from '@material-ui/icons';
import React, { useContext, useEffect } from 'react';
import { SongContext } from '../context';


const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    avatar: {
        width: 44,
        height: 44
    },
    text: {
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
});

const QueuedSong = ({ song }) => {
    const classes = useStyles();
    const { artist, title, thumbnail } = song;
    const { state, dispatch } = useContext(SongContext);

    useEffect(() => {
        removeFromLocalStorage();
    }, [state.queuedSongs])

    // console.log('queued song qs:', state.queuedSongs)
    // console.log('queued song ls:', JSON.parse(localStorage.getItem('queue')))

    const removeFromLocalStorage = () => {
        localStorage.setItem('queue', JSON.stringify(state.queuedSongs))
    }

    const handleRemoveQueue = () => {
        if (state.queuedSongs.length === 1) localStorage.clear()
        dispatch({ type: 'REMOVE_FROM_QUEUE', payload: { song } })
    }

    return (
        <div className={classes.container}>
            <Avatar className={classes.avatar} src={thumbnail} alt='song thumbnail' />
            <div className={classes.songInfoContainer}>
                <Typography className={classes.text} variant='subtitle2'>
                    {title}
                </Typography>
                <Typography style={{ color: "lightblue" }} className={classes.text} color="textSecondary" variant='body2'>
                    {artist}
                </Typography>
            </div>
            <IconButton onClick={handleRemoveQueue}>
                {/* <Delete color="error" /> */}
                {/* <RemoveFromQueue color="error" /> */}
                <RemoveFromQueueTwoTone color="error" />
            </IconButton>
        </div>
    )
}

export default QueuedSong;
