import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { AddBoxOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import LinkIcon from '@material-ui/icons/Link';
import SoundCloudPlayer from 'react-player/soundcloud';
import YouTubePlayer from 'react-player/youtube';
import ReactPlayer from 'react-player';
import { useMutation } from '@apollo/client';
import { ADD_SONG } from '../graphql/mutations';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  urlInput: {
    margin: theme.spacing(1)
  },
  addSongButton: {
    margin: theme.spacing(1)
  },
  dialog: {
    textAlign: 'center'
  },
  thumbnail: {
    width: '90%'
  }
}));

const INITIAL_SONG = {
  artist: '',
  title: '',
  duration: 0,
  thumbnail: ''
}

const AddSong = () => {
  const [addSong, { error }] = useMutation(ADD_SONG);
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState('');
  const [urlPlayable, setUrlPlayable] = useState(false);
  const [song, setSong] = useState(INITIAL_SONG);

  useEffect(() => {
    const urlCanPlay = YouTubePlayer.canPlay(url) || SoundCloudPlayer.canPlay(url);
    setUrlPlayable(urlCanPlay);
  }, [url])


  const handleCloseDialog = () => {
    setDialog(false);
  }

  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYouTubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer)
      // console.log('soundcloud song data:', songData)
    }
    setSong({ ...songData, url });
  }

  const getYouTubeInfo = player => {
    const duration = player.getDuration();
    const { author, title, video_id } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`

    return {
      artist: author,
      title,
      duration,
      thumbnail
    }
  }

  const getSoundCloudInfo = player => {
    return new Promise (resolve => {
      player.getCurrentSound(songData => {
        if (songData) {
          // song data to include for future: genre, likes? description? label
          // console.log('soundcloud song data: (in get function)', songData)
          resolve ({
            artist: songData.user.username,
            title: songData.title,
            duration: Number(songData.duration / 1000),
            thumbnail: songData.artwork_url.replace('-large', '-t500x500')
          })
        }
    })})
  }

  const handleEditSongChange = e => {
    setSong(prevSongState => ({
      ...prevSongState,
      [e.target.name]: e.target.value
    }))
  }

  const handleAddSong = async () => {
    try {
      const { artist, title, duration, thumbnail, url } = song;

      await addSong({ variables: { 
        artist: artist.trim().length > 0 ? artist : null,
        title: title.trim().length > 0 ? title : null,
        duration: duration > 0 ? duration : null,
        thumbnail: thumbnail.trim().length > 0 ? thumbnail : null,
        url: url.trim().length > 0 ? url : null
       }})
       setSong(INITIAL_SONG)
      handleCloseDialog();
    } catch (error) {
      // console.error('An error occured when trying to \'add\' a song - See below:\n\n', error);
    }
  }


  const handleAddSongError = inputField => {
    return error?.graphQLErrors[0]?.extensions.path.includes(inputField)
  }

  return (
    <>
      <h1>Add Song:</h1>
      <div className={classes.container}>
        <Dialog 
          className={classes.dialog}
          open={dialog}
          onClose={handleCloseDialog}
        >
          <DialogTitle>Edit Song</DialogTitle>
          <DialogContent>
            <img 
              className={classes.thumbnail}
              src={song.thumbnail}
              alt="song thumbnail"
            />
            <TextField 
              margin="dense"
              name="title"
              label="Title"
              fullWidth
              value={song.title}
              onChange={handleEditSongChange}
              error={handleAddSongError('title')}
              helperText={handleAddSongError('title') && "Please fill out this field"}
            />
            <TextField 
              margin="dense"
              name="artist"
              label="Artist"
              value={song.artist}
              onChange={handleEditSongChange}
              error={handleAddSongError('artist')}
              helperText={handleAddSongError('artist') && "Please fill out this field"}
              fullWidth
            />
            <TextField 
              margin="dense"
              name="thumbnail"
              label="Thumbnail"
              value={song.thumbnail}
              onChange={handleEditSongChange}
              error={handleAddSongError('thumbnail')}
              helperText={handleAddSongError('thumbnail') && "Please fill out this field"}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
            <Button onClick={handleAddSong} variant="outlined" color="primary">Add Song</Button>
          </DialogActions>
        </Dialog>
        <TextField
          className={classes.urlInput}
          onChange={e => setUrl(e.target.value)}
          value={url}
          placeholder="Add YouTube or SoundCloud URL"
          fullWidth 
          margin="normal"
          type="url"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button 
          disabled={!urlPlayable}
          className={classes.addSongButton}
          variant="contained"
          color="primary"
          endIcon={<AddBoxOutlined />}
          onClick={() => setDialog(true)}
        >
          Add
        </Button>
      </div>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </>
  )
}

export default AddSong;
