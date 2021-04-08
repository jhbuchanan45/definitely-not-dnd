const getMod = (raw: number): number => {
    return (Math.floor((raw / 2) - 5));
}

export class Token {
    token: any;

    constructor(tokenRaw: any) {
        const token = { ...tokenRaw };
        this.token = token;
        // parse class
        token.classes?.forEach((tClass, classIndex) => {
            const { _id: pClass } = tClass;

            pClass?.features.forEach((feature) => {
                // level check
                if (feature.level <= tClass.level) {

                    // multiclass check
                    if (!feature.multiclass || (feature.multiclass && classIndex === 0)) {

                        feature.modifiers?.forEach((mod) => {
                            // multiclass check for modifier
                            if (!mod.multiclass || (mod.multiclass && classIndex === 0)) {
                                this.applyModifier(mod, feature.label, tClass.level)
                            }
                        })
                    }
                }
            })
        })

        // Parse Items
        token.inventory.forEach((item) => {
            switch (item.details.itemType) {
                case "armour": { this.util.items.applyArmourMods(item); break; }

            }
        })

        // TODO - PARSE RACE & PARSE CUSTOM
    }

    private applyModifier = (mod, source, tClass = 1) => {
        switch (mod.target) {
            case "HP": {
                // requires target + t2 + ?mode
                if (mod.t2 === "hit") {
                    // handle non-standard usecase
                    const target = this.token.stats.HP.hit.mods || [];
                    this.token.stats.HP.hit.mods = target;

                    if (typeof mod.value === 'string') {
                        mod.value = [mod.value];
                    }

                    mod.value?.forEach(val => { target.push({ value: tClass + val, src: source }) })
                    break;
                }
            }
            case "core": {
                // requires target + t2 + mode
            }
            case "savingThrows": {
                // require target + t2 + mode
            }
            case "speed": {
                // requires target + t2 + mode
            }
            case "vision": {
                // requires target + t2 + mode
            }
            case "skills": {
                // require target + t2 + mode

                // for adding proficiency
                if (mod.mode === "prof" && (mod.target === "skills" || mod.target === "savingThrows")) {
                    this.util.prof.t2(mod, source);
                } else {
                    // for number changes
                    this.util.int.t2(mod, source)
                }
                break;
            }
            case "initiative": {
                // requires target + mode
            }
            case "proficiency": {
                // requires target + mode
            }
            case "AC": {
                // requires target + mode
                if (mod.mode === "coreMod") {
                    this.util.coreMod(mod, source);
                } else {
                    // overflow from shared previous cases
                    this.util.int.t1(mod, source);
                }
                break;
            }
            case "proficiencies": {
                // require target + t2
            }
            case "resist": {
                // requires target + t2
                this.util.str.t2(mod, source);
                break;
            }
        }
    }

    private util = {
        items: {
            applyArmourMods: (item) => {
                if (item.details.baseAC.value !== 0) {
                    this.applyModifier(item.details.baseAC, item.details.name);
                }

                if (item.details.coreMod) {
                    this.applyModifier(item.details.coreMod, item.details.name);
                }

                item.details.mods?.forEach((mod) => {
                    this.applyModifier(mod, item.details.name);
                })
            }
        },
        int: {
            t1: (mod, label) => {
                const target = this.token.stats[mod.target]?.mods || [];
                this.token.stats[mod.target].mods = target;
                target.push({ mode: mod.mode, value: mod.value, src: label });
            },
            t2: (mod, label) => {
                const target = this.token.stats[mod.target][mod.t2]?.mods || [];
                this.token.stats[mod.target][mod.t2].mods = target;
                target.push({ mode: mod.mode, value: mod.value, src: label })
            }
        },
        str: {
            t2: (mod, label) => {
                // handle both init and existing class value cases
                const target = this.token.stats[mod.target].mods?.[mod.t2] || [];
                this.token.stats[mod.target].mods = this.token.stats[mod.target].mods || {};
                this.token.stats[mod.target].mods[mod.t2] = target;

                // handle value being string instead of array
                if (typeof mod.value === 'string') {
                    mod.value = [mod.value];
                }
                mod.value?.forEach(val => { target.push({ value: val, src: label }) })
            }
        },
        prof: {
            t1: (mod, label) => {
                const target = this.token.stats[mod.target]?.prof.mods || [];
                this.token.stats[mod.target].prof.mods = target;
                target.push({ level: mod.value, src: label });
            },
            t2: (mod, label) => {
                const target = this.token.stats[mod.target][mod.t2]?.prof.mods || [];
                this.token.stats[mod.target][mod.t2].prof.mods = target;
                target.push({ level: mod.value, src: label });
            }
        },
        coreMod: (mod, label) => {
            const target = this.token.stats[mod.target]?.mods || [];
            this.token.stats[mod.target].mods = target;
            target.push({ mode: mod.mode, cap: mod.value, coreMod: mod.coreMod, src: label });
        }
    }

    getLevel = () => {
        let tLevel = 0;
        this.token.classes.forEach(({ level }) => {
            tLevel += level;
        })

        return tLevel;
    }

    getProficiencyLevel = (prof): number => {
        let level: number = prof.level || 0;

        // keep level within valid bounds
        if (!(level < 4) || level < 0) { level = 0 };

        // handle class
        if (prof.mods) {
            prof.mods.forEach(mod => {
                if (level < mod.level && mod.level < 4) {
                    level = mod.level;
                }
            })
        }

        return level;
    }

    getProficiency = (prof: number): { type: String, mult: number } => {
        // maps proficiency number to type
        switch (prof) {
            case 0: {
                return { type: "Not Proficient", mult: 0 };
            }
            case 1: {
                return { type: "Half Proficient", mult: 0.5 };
            }
            case 2: {
                return { type: "Proficient", mult: 1 };
            }
            case 3: {
                return { type: "Expert", mult: 2 };
            }
        }

        return { type: "", mult: 1 };
    }

    coreShortToLong = (core: "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA"): String => {
        switch (core) {
            case "STR": return "Strength"
            case "DEX": return "Dexterity"
            case "CON": return "Constitution"
            case "INT": return "Intelligence"
            case "WIS": return "Wisdom"
            case "CHA": return "Charisma"
        }
    }

    private genericSkillParse = (stat, type, coreStat): { mod: number, prof: String } => {
        const skillMod = this.token.stats[type][stat];

        const profBonus = this.UI.proficiencyParse();
        const profLevel = this.getProficiency(this.getProficiencyLevel(skillMod.prof));
        let tThrow = 0;

        if (skillMod.mod === 0) {

            // handle classes

            for (let mod in skillMod.mods) {
                switch (skillMod.mods[mod].mode) {
                    case 'add': {
                        tThrow += skillMod.mods[mod].value;
                        break;
                    }
                    case 'set': {
                        return { mod: skillMod.mods[mod].value, prof: profLevel.type };
                    }
                }
            }

            // add appropriate prof
            tThrow += (this.UI.coreParse(coreStat).tMod);
            tThrow += Math.floor(profBonus * profLevel.mult);
            tThrow += skillMod.bns;

        } else {
            return { mod: skillMod.mod, prof: profLevel.type }
        }

        return { mod: tThrow, prof: profLevel.type }
    }

    UI = {
        coreParse: (coreType): { total: number, tMod: number } => {
            const stat = this.token.stats.core[coreType];

            if (stat.mod !== 0 && stat.mod) {
                return { total: stat.base, tMod: stat.mod }
            }
            else if (stat.base !== 0 && stat.base) {
                return { total: stat.base, tMod: getMod(stat.base) };
            } else {
                let coreStat = stat.raw;

                // parse class modifiers if present
                if (stat.mods) {
                    for (let modRef in stat.mods) {
                        const mod = stat.mods[modRef];
                        switch (mod.mode) {
                            case 'add': {
                                coreStat = coreStat + mod.value;
                                break;
                            }
                            case 'set': {
                                return mod.value;
                            }
                        }
                    }
                }

                return { total: coreStat, tMod: getMod(coreStat) };
            }
        },

        proficiencyParse: (): number => {
            // handle modifiers &/or base from total level
            let tProf = 0;
            const prof = this.token.stats.proficiency;

            if (prof.base === 0) {
                // calc from class levels
                tProf = (Math.floor(this.getLevel() / 5) + 2)

                // check class modifiers
                if (prof.mods) {
                    for (let mod in prof.mods) {
                        switch (prof.mods[mod].mode) {
                            case 'add': {
                                tProf += prof.mods[mod].value;
                                break;
                            }
                            case 'set': {
                                return prof.mods[mod].value;
                            }
                        }
                    }
                }

                return tProf;
            } else {
                return prof.base;
            }
        },

        savingThrowParse: (stat): { mod: number, prof: String } => {
            return this.genericSkillParse(stat, "savingThrows", stat);
        },

        skillCheckParse: (skill) => {
            const skillMod = this.token.stats.skills[skill];
            return this.genericSkillParse(skill, "skills", skillMod.check);
        },

        armourClassParse: (): { total: Number, base: Number, mod: Number, coreMods: String[] } => {
            // supports add, set, coreMod and base modes
            const AC = this.token.stats.AC;
            let baseAC = 10;
            let modAC = 0;
            let coreModAC = 0;
            let coreMods: String[] = [];

            if (AC.mods) {
                for (let modRef in AC.mods) {
                    const mod = AC.mods[modRef];
                    switch (mod.mode) {
                        case "add": { modAC += mod.value; break; }
                        case "set": { return { total: mod.value, base: mod.value, coreMods: [], mod: 0 } }
                        case "coreMod": {
                            const coreModVal = this.UI.coreParse(mod.coreMod).tMod;
                            coreModAC += (mod.cap > 0)
                                ? (coreModVal <= mod.cap) ? coreModVal : mod.cap
                                : coreModVal
                            coreMods.push(mod.coreMod);
                            break;
                        }
                        case "base": { baseAC = mod.value > baseAC ? mod.value : baseAC; break; }
                    }
                }
            }

            return { total: baseAC + modAC + coreModAC, base: baseAC, mod: modAC, coreMods };
        },

        initiativeParse: () => {
            const init = this.token.stats.initiative;

            let tInit = this.UI.coreParse("DEX").tMod;

            if (init.base === 0) {
                // check modifiers
                if (init.mods) {
                    for (let mod in init.mods) {
                        switch (init.mods[mod].mode) {
                            case 'add': {
                                tInit += init.mods[mod].value;
                                break;
                            }
                            case 'set': {
                                return init.mods[mod].value;
                            }
                        }
                    }
                }

                return tInit;
            } else {
                return init.base;
            }
        },

        speedParse: (speedType: string): Number => {
            const speed = this.token.stats.speed[speedType];

            let tSpeed = speed.base;

            if (speed.mods) {
                for (let modRef in speed.mods) {
                    const mod = speed.mods[modRef];
                    switch (mod.mode) {
                        case "add": {
                            tSpeed += mod.value;
                        }
                        case "set": {
                            return mod.value;
                        }
                    }
                }
            }

            return tSpeed;
        },

        hpParse: (): { cHP: Number, mHP: Number, tHP: Number, hitDice: String[] } => {
            const HP = this.token.stats.HP;

            let cHP: Number = HP.current;
            let mHP: Number = HP.max.base;
            let tHP: Number = HP.max.base;
            let hitDiceObj = {};
            let hitDice: String[] = [];

            // handle maxHP
            calcMHP: {
                for (let modRef in HP.max.mods) {
                    const mod = HP.max.mods[modRef];
                    switch (mod.mode) {
                        case "add": { mHP += mod.value; break; }
                        case "set": { mHP = mod.value; break calcMHP; }
                    }
                }
            }

            // handle current HP
            if (cHP > mHP) { cHP = mHP; HP.current = mHP; }

            // handle temp HP
            calcTHP: {
                for (let modRef in HP.tmp.mods) {
                    const mod = HP.tmp.mods[modRef];
                    switch (mod.mode) {
                        case "add": { tHP += mod.value; break; }
                        case "set": { tHP = mod.value; break calcTHP; }
                    }
                }
            }

            // handle hit dice
            HP.hit.mods.forEach(mod => {
                const splitDice = mod.value.split('d');
                const curHit = hitDiceObj['d' + splitDice[1]];

                hitDiceObj['d' + splitDice[1]] = curHit ? (curHit + parseInt(splitDice[0])) : parseInt(splitDice[0])
            });

            hitDice = Object.keys(hitDiceObj).map((dice) => {
                return hitDiceObj[dice] + dice;
            })

            return { cHP, mHP, tHP, hitDice };
        }
    }

}