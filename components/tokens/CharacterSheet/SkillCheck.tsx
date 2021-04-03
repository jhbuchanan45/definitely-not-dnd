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
        const size = "small";

        switch (prof) {
            case "Not Proficient": return <RadioButtonUnchecked fontSize={size} />
            case "Half Proficient": return <Adjust fontSize={size} />
            case "Proficient": return <RadioButtonChecked fontSize={size} />
            case "Expert": return <GroupWork fontSize={size} />
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
            <Typography variant="h6">
                Skills
            </Typography>
            <Grid container direction="column">
                {renderSkills()}
            </Grid>
        </>
    )
}

export default SkillCheck;
