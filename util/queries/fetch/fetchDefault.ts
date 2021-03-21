import API from '../../API';
import { getAuth } from '../../AuthCall';

const fetchDefault = async (getAccessTokenSilently, endpoint) => {

    const response = await API.get(endpoint, {
        headers: { Authorization: `Bearer ${await getAuth(getAccessTokenSilently)}` }
    })

    return response.data;
}

const defaultError = (enqueueSnackbar, errMsg?, successMsg?) => ({
    onError: (err: any) => {
        enqueueSnackbar(errMsg ? errMsg : err.message, { variant: "error" })
    },
    onSuccess: (data: any) => {
        if (process.env.NODE_ENV === "development") {
            enqueueSnackbar(successMsg, { variant: "success" });
        }
    }
})

const fetchCampaign = async (getAuthAPI) => await fetchDefault(getAuthAPI, '/campaign');
export const useCampaign = (getAuthAPI, useQuery, enqueueSnackbar) => {
    return useQuery('campaigns', async () => await fetchCampaign(getAuthAPI), {
        onError: (err: any) => {
            enqueueSnackbar(err.message, { variant: "error" })
        }
    });
}


const fetchUser = async (getAuthAPI) => await fetchDefault(getAuthAPI, '/user');
export const userQuery = (getAuthAPI, enqueueSnackbar): [any, any, any] => {
    return ['user', async () => await fetchUser(getAuthAPI), { ...defaultError(enqueueSnackbar, null, "Loaded User Successfully") }]
}
export const useUser = (getAuthAPI, useQuery, enqueueSnackbar) => {
    return useQuery(...userQuery(getAuthAPI, enqueueSnackbar));
}


export const fetchTokens = async (getAuthAPI, campaignID) => {
    const initialRes = await fetchDefault(getAuthAPI, `/token/campaign/${campaignID}`);

    const parseModifiers = (inToken: any) => {
        const token = { ...inToken };

        const util = {
            int: {
                t1: (mod, label) => {
                    const target = token.stats[mod.target]?.class || [];
                    token.stats[mod.target].class = target;
                    target.push({ mode: mod.mode, value: mod.value, src: label });
                },
                t2: (mod, label) => {
                    const target = token.stats[mod.target][mod.t2]?.class || [];
                    token.stats[mod.target][mod.t2].class = target;
                    target.push({ mode: mod.mode, value: mod.value, src: label })
                }
            },
            str: {
                t2: (mod, label) => {
                    // handle both init and existing class value cases
                    const target = token.stats[mod.target].class?.[mod.t2] || [];
                    token.stats[mod.target].class = token.stats[mod.target].class || {};
                    token.stats[mod.target].class[mod.t2] = target;

                    // handle value being string instead of array
                    if (typeof mod.value === 'string') {
                        mod.value = [mod.value];
                    }
                    mod.value?.forEach(val => { target.push({ value: val, src: label }) })
                }
            },
            prof: {
                t1: (mod, label) => {
                    token.stats[mod.target].prof.pClass = { flag: true, src: label };
                },
                t2: (mod, label) => {
                    token.stats[mod.target][mod.t2].prof.pClass = { flag: true, src: label };
                }
            }
        }

        // parse class
        token.classes?.forEach((tClass) => {
            const { _id: pClass } = tClass;

            pClass.modifiers.forEach((mod) => {
                switch (mod.target) {
                    case "HP": {
                        // requires target + t2 + ?mode
                        if (mod.t2 === "hit") {
                            // handle non-standard usecase
                            const target = token.stats.HP.hit.class || [];
                            token.stats.HP.hit.class = target;

                            if (typeof mod.value === 'string') {
                                mod.value = [mod.value];
                            }

                            mod.value?.forEach(val => { target.push({ value: tClass.level + val, src: pClass.label }) })
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
                            util.prof.t2(mod, pClass.label);
                        } else {
                            // for number changes
                            util.int.t2(mod, pClass.label)
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
                        // overflow from shared previous cases
                        util.int.t1(mod, pClass.label);
                        break;
                    }
                    case "proficiencies": {
                        // require target + t2
                    }
                    case "resist": {
                        // requires target + t2
                        util.str.t2(mod, pClass.label);
                        break;
                    }
                }
            })
        })
        return token;
    }

    return initialRes?.map((token) => parseModifiers(token));
};

export const fetchPlayers = async (getAuthAPI, campaignID) => await fetchDefault(getAuthAPI, `/player/campaign/${campaignID}`);

export const fetchMaps = async (getAuthAPI, campaignID) => await fetchDefault(getAuthAPI, `/map/campaign/${campaignID}`);

export const useMap = (getAuthAPI, useQuery, enqueueSnackbar, mapID) => {
    return useQuery(['map', mapID], async () => await fetchDefault(getAuthAPI, `map/${mapID}`), {
        ...defaultError(enqueueSnackbar, null, "Loaded User Successfully")
    })
}

export default fetchDefault;