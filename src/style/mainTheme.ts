import {createMuiTheme, Theme} from '@material-ui/core/styles';
import { dark } from '@material-ui/core/styles/createPalette';

const colours = {
    primary: "#524947",
    secondary: "#D9907C",
    text: "#52362F",
    info: "#D1BBB5"
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
    }
})

export default mainTheme;