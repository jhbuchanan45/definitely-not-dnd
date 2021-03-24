import { makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { tokenUI } from '../../util/TokenParser';
import Inspiration from './CharacterSheet/Inspiration';

const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        gridTemplateColumns: "repeat(12, 125px)",
        gridTemplateRows: "65px repeat(12, 60px)",
        height: "100%",
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
    }
}))

interface Props {
    token: any,
    update: any
}

const CharacterSheet = (props: Props) => {
    const { mainGrid } = useStyles();
    const { token, update: updateToken } = props;
    let coreMods = {};

    const renderCoreStats = () => {
        // MUST RUN FIRST

        let coreStats: JSX.Element[] = [];

        let index = 2;
        for (let mainStat in token.stats.core) {
            if (mainStat === "XTR") break; // ignore for now
            const stat = tokenUI.coreParse(token.stats.core[mainStat]);

            coreMods[mainStat] = stat.tMod;

            coreStats.push(<div key={mainStat} style={{ gridArea: `${index}/1/${index+2}/1`, textAlign: "center" }}><pre>{stat.tMod + "\n\n" + stat.total + "\n\n" + mainStat}</pre></div>)
            index+= 2;
        }

        return coreStats;
    }

    const renderInspiration = () => {
        return (<div style={{gridArea: "2/2/3/4"}}><Inspiration update={updateToken} inspiration={token.inspiration} /></div>)
    }

    return (
        <div className={mainGrid}>
            {renderCoreStats()}
            {renderInspiration()}
        </div>
    )
}

export default CharacterSheet
