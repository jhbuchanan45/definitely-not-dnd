import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { tokenUI } from '../../util/TokenParser';

const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        gridTemplateColumns: "repeat(12, auto)",
        gridTemplateRows: "60px repeat(6, auto)",
        height: "100%",
        display: "grid"
    }
}))

interface Props {
    token: any,
    update: any
}

const CharacterSheet = (props: Props) => {
    const { mainGrid } = useStyles();
    const { token, update: updateToken } = props;

    const renderCoreStats = () => {
        let coreStats: JSX.Element[] = [];

        let index = 1;
        for (let mainStat in token.stats.core) {
            if (mainStat === "XTR") break; // ignore for now
            
            index++;
            const stat = tokenUI.coreParse(token.stats.core[mainStat]);

            coreStats.push(<div key={mainStat} style={{ gridArea: index + "/1", textAlign: "center" }}><pre>{stat.tMod + "\n\n" + stat.total + "\n\n" + mainStat}</pre></div>)
        }

        return coreStats;
    }

    return (
        <div className={mainGrid}>
            {renderCoreStats()}
        </div>
    )
}

export default CharacterSheet
