import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Album, Audiotrack } from '@material-ui/icons';
import React from 'react';


const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: '8px'
    },
    header_bg: {
        backgroundColor: theme.palette.primary.main
    }
}))

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.header_bg} position='fixed'>
            <Toolbar>
                {/* <Audiotrack /> */}
                <Album />
                <Typography
                    className={classes.title}
                    variant="h6"
                    component="h1"
                >
                    record crate
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
