import { Grid, Hidden, useMediaQuery } from "@material-ui/core";
import { useContext, useReducer } from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
// import QueuedSongs from "./container/QueuedSongs";
import { SongContext } from "./context";
import songReducer from "./reducer";


function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);

  const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      {/* {greaterThanSm && <Header />} */}
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{ paddingTop: greaterThanSm ? 80 : 10 }}
          item xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={greaterThanMd ? {
            position: "fixed",
            width: '100%',
            right: 0,
            top: 70
          } : {
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%'
          }}
          item xs={12} md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
