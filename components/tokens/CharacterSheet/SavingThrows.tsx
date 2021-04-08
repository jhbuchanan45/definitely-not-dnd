import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Token } from '../../../util/TokenParser';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import Adjust from '@material-ui/icons/Adjust';
import GroupWork from '@material-ui/icons/GroupWork';

interface Props {
    token: Token,
    update: any
}



const SavingThrows = (props: Props) => {

    const proficiencyIcon = (prof) => {
        const size = "small";

        switch (prof) {
            case "Not Proficient": return <RadioButtonUnchecked fontSize={size} />
            case "Half Proficient": return <Adjust fontSize={size} />
            case "Proficient": return <RadioButtonChecked fontSize={size} />
            case "Expert": return <GroupWork fontSize={size} />
        }
    }

    const renderThrows = () => {
        let sThrows: JSX.Element[] = [];

        let coreSave: any;
        for (coreSave in props.token.token.stats.savingThrows) {
            if (coreSave === "XTR") { break; }
            const coreMod = props.token.UI.savingThrowParse(coreSave);

            sThrows.push(
                <Grid item container direction="row" spacing={1}>
                    <Grid item>{proficiencyIcon(coreMod.prof)}</Grid>
                    <Grid item>
                        <Typography variant="body2">
                            {(coreMod.mod < 0 ? "" : "+") + coreMod.mod}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                            {props.token.coreShortToLong(coreSave)}
                        </Typography>
                    </Grid>
                </Grid>
            )
        }

        return sThrows;
    }

    return (
        <>
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item>
                    <Grid container direction="column">
                        {renderThrows()}
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">
                        Saving Throws
                </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default SavingThrows;
