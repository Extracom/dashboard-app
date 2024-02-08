import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface ThemeOptions {
        [key: string]: any;
    }
    interface Theme {
        [key: string]: any;
    }
}

const palette = {
    primary: {
        main: '#1976d2',
    },
    secondary: {
        main: '#dc004e',
    },
    appBar: {
        main: '#1890ff', // AppBar color
        icon: '#ffffff', // AppBar icon color
    },
    body: {
        background: '#fafafb',
    }
};

const theme = createTheme({
    palette: palette,
    boxes: {
        body: {
            backgroundColor: palette.body.background,
        },
        // You can define more box styles here...
    },
    cards: {
        primary: {
            borderRadius: '8px',
            boxShadow: 1,
            border: 1,
            borderColor: 'rgb(230,235,241)',
            p: 2,
            //paddingBottom: '24px'
            //transition: 'box-shadow 300ms ease-in-out'
        },
        square: {
            borderRadius: '8px',
            boxShadow: 1,
            border: 1,
            borderColor: 'rgb(230,235,241)',
            p: 0,
            //paddingBottom: '24px'
            //transition: 'box-shadow 300ms ease-in-out'
        },
    },
    iconButtons: {
        appBar: {
            color: 'inherit',
            '&:hover': {
                color: 'inherit',
            },
        },
    },
    typographies: {
        appBar: {
            color: 'inherit',
            ml: 2,
        },
    },
    appBars: {
        primary: {
            backgroundColor: palette.appBar.main
        }
    }
});

export default theme;

