const songReducer = (state, action) => {
    switch (action.type) {
        case 'PLAY_SONG':

            return {
                ...state,
                isPlaying: true
            };
        case 'PAUSE_SONG':

            return {
                ...state,
                isPlaying: false
            };
        case 'SET_SONG':
            return {
                ...state,
                song: action.payload.song
            }
        case 'ADD_SONG_TO_QUEUE':
            const inQueue = state.queuedSongs.includes(action.payload.song)
            if (!inQueue) {
                state.queuedSongs.push(action.payload.song)
            }
            return {
                ...state,
                queuedSongs: state.queuedSongs
            }
        case 'REMOVE_FROM_QUEUE':
            const updatedQueue = state.queuedSongs.filter(song => (
                song.id !== action.payload.song.id
            ));
            return {
                ...state,
                queuedSongs: updatedQueue
            }
        default:
            return state;
    }
}

export default songReducer;