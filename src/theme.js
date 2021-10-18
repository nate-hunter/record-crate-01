import { createTheme } from '@material-ui/core/styles';


const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        light: '#7B68EE',
        // main: '#48a0c3',
        main: '#6A5ACD', // Bandcamp-like
        dark: '#483D8B',
        contrastText: '#fff',
      },
      secondary: {
        light: '#00CED1',
        main: '#20B2AA',
        dark: '#008B5B',
        contrastText: '#000',
      },
    },
    typography: {
      fontFamily: 'Urbanist'
    }
  });

export default theme;


/**
 * Colors:
 * steel-bluish: #48a0c3
 * 
 */

/* 
 * Fonts:
 * font-family: "Lalezar", cursive;
 * font-family: 'Open Sans', sans-serif;
 * font-family: 'Poppins', sans-serif;
 * font-family: 'Urbanist', sans-serif;
 */