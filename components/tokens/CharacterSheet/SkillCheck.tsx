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

const SkillCheck = (props: Props) => {

    const proficiencyIcon = (prof) => {
        const size = "17px";

        switch (prof) {
            case "Not Proficient": return <RadioButtonUnchecked style={{fontSize: size}} />
            case "Half Proficient": return <Adjust style={{fontSize: size}} />
            case "Proficient": return <RadioButtonChecked style={{fontSize: size}} />
            case "Expert": return <GroupWork style={{fontSize: size}} />
        }
    }

    const renderSkills = () => {
        let skillCheckList: JSX.Element[] = [];

        let skillCheck: any;
        for (skillCheck in props.token.token.stats.skills) {
            if (skillCheck === "extra") { break; }
            const skillMod = props.token.UI.skillCheckParse(skillCheck);

            skillCheckList.push(
                <Grid key={skillCheck} item container direction="row" spacing={1}>
                    <Grid item>{proficiencyIcon(skillMod.prof)}</Grid>
                    <Grid item>
                        <Typography variant="body2">
                            {(skillMod.mod < 0 ? "" : "+") + skillMod.mod}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                            {props.token.token.stats.skills[skillCheck].label}
                        </Typography>
                    </Grid>
                </Grid>
            )
        }

        return skillCheckList;
    }

    return (
        <>
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item>
                    <Grid container alignContent="flex-start" direction="column">
                        {renderSkills()}
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">Skills</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default SkillCheck;
