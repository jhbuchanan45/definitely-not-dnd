import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Token } from '../../util/TokenParser';
import Inspiration from './CharacterSheet/Inspiration';
import ProficiencyBonus from './CharacterSheet/ProficiencyBonus';
import SavingThrows from './CharacterSheet/SavingThrows';
import SkillCheck from './CharacterSheet/SkillCheck';

const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        gridTemplateColumns: "repeat(12, 110px)",
        gridTemplateRows: "65px repeat(12, 60px) auto",
        height: "100%",
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        border: "solid 1px " + theme.palette.common.black,
        marginTop: theme.spacing(2),
    },
    gridWrapper: {
        display: "flex",
    }
}))

interface Props {
    token: Token,
    update: any
}

const CharacterSheet = (props: Props) => {
    const { mainGrid, gridWrapper } = useStyles();
    const { token, update: updateToken } = props;
    let coreMods = {};

    const renderCoreStats = () => {
        // MUST RUN FIRST

        let coreStats: JSX.Element[] = [];

        let index = 2;
        for (let mainStat in token.token.stats.core) {
            if (mainStat === "XTR") break; // ignore for now
            const stat = token.UI.coreParse(mainStat);

            coreMods[mainStat] = stat.tMod;

            coreStats.push(<div key={mainStat} style={{ gridArea: `${index}/1/${index + 2}/1`, textAlign: "center" }}><pre>{(stat.tMod < 0 ? "" : "+") + stat.tMod + "\n\n" + stat.total + "\n\n" + mainStat}</pre></div>)
            index += 2;
        }

        return coreStats;
    }

    const renderInspiration = () => {
        return (
            <div style={{ gridArea: "2/2/3/4" }}><Inspiration update={updateToken} inspiration={token.token.inspiration} /></div>
        )
    }

    const renderProfBonus = () => {
        return (
            <div style={{ gridArea: "3/2/4/4" }}><ProficiencyBonus update={updateToken} profBonus={token.UI.proficiencyParse()} /></div>
        )
    }

    const renderSavingThrows = () => {
        return (
            <div style={{ gridArea: "4/2/7/4" }}><SavingThrows update={updateToken} token={token} /></div>
        )
    }

    const renderSkillChecks = () => {
        return (
            <div style={{ gridArea: "7/2/15/4", alignSelf: "start" }}><SkillCheck update={updateToken} token={token} /></div>
        )
    }

    return (
        <div className={gridWrapper}>
            <div className={mainGrid}>
                {renderCoreStats()}
                {renderInspiration()}
                {renderProfBonus()}
                {renderSavingThrows()}
                {renderSkillChecks()}
            </div>
        </div>
    )
}

export default CharacterSheet
