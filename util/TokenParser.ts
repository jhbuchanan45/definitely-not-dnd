const getMod = (raw: number): Number => {
    return (Math.floor((raw / 2) - 5));
}

export const tokenUI = {
    coreParse: (stat): { total: Number, tMod: Number } => {
        if (stat.mod !== 0 && stat.mod) {
            return { total: stat.base, tMod: stat.mod }
        }
        else if (stat.base !== 0 && stat.base) {
            return { total: stat.base, tMod: getMod(stat.base) };
        } else {
            let coreStat = stat.raw;

            // parse class modifiers if present
            if (stat.class) {
                stat.class.forEach((mod) => {
                    switch (mod.mode) {
                        case 'add': {
                            coreStat = coreStat + mod.value;
                            break;
                        }
                        case 'set': {
                            coreStat = mod.value;
                            break;
                        }
                    }
                })
            }

            return { total: coreStat, tMod: getMod(coreStat) };
        }
    }
}