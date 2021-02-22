import {createMuiTheme, Theme} from '@material-ui/core/styles';

const colours = {
    primary: "#524947",
    secondary: "#D9907C",
    text: "#52362F",
    info: "#D1BBB5",
    darkInfo: "#91837E",
    lightInfo: "#DEC7C1"
}

const mainTheme: Theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1600,
        },
    },
    palette: {
        type: 'dark',
        common: {
            white: "#020002",
            black: "#2F4F4F"
        },
        primary: {
            main: colours.primary,
        },
        secondary: {
            main: colours.secondary,
        },
        text: {
            primary: colours.text,
        },
        info: {
            main: colours.info,
            dark: colours.darkInfo,
            light: colours.lightInfo
        },
            background: {
                paper: colours.info,
            }
    },
    typography: {
        fontFamily: "\"Domine\",\"Roboto\", \"Helvetica\", \"Arial\",\"sans-serif\""
    },
    shape: {
        borderRadius: 2,
    },
})

export default mainTheme;