import authAPI from './authAPI';
import React from 'react'
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { createMap } from '../../redux/maps/mapSlice';
import { createCampaign, fetchCampaigns } from '../../redux/campaign/campaignSlice';
import { createToken } from '../../redux/token/tokenSlice';
import { createPlayer } from '../../redux/player/playerSlice';

export const MakeFullCampaign = () => {
    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();

    // make campaign
    const createFullCampaign = async () => {
        const campaignTemplate = {
            name: "Hoard of the Ice Queen",
            image: "https://media-waterdeep.cursecdn.com/attachments/6/718/cover4k.jpg"
        }

        await authAPI(getAccessTokenSilently, { campaign: campaignTemplate }, dispatch, createCampaign);
    }

    return (
        <Button color="inherit" onClick={() => createFullCampaign()}>Create Campaign</Button>
    )
}

export const FillCampaign = () => {
    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();

    const campaign = useSelector((state: any) => state.campaign.campaigns[(state.campaign.campaigns.length - 1)])

    // make campaign
    const createFullCampaign = async () => {
        const maps = [
            {
                campaignId: campaign._id,
                name: "Test Map 1",
                image: "test_map1.png"
            },
            {
                campaignId: campaign._id,
                name: "Test Map 2",
                image: "test_map2.png"
            },
            {
                campaignId: campaign._id,
                name: "Test Map 3",
                image: "test_map3.png"
            }
        ]

        const tokens = [
            {
                campaignId: campaign._id,
                name: "Test Token 1",
                image: "test_token1.png"
            },
            {
                campaignId: campaign._id,
                name: "Test Token 2",
                image: "test_token2.png"
            },
            {
                campaignId: campaign._id,
                name: "Test Token 3",
                image: "test_token3.png"
            }
        ]

        const players = [
            {
                campaignId: campaign._id,
                name: "Test Token 1",
                image: "test_token1.png",
                player: "auth0|6000f21c037ac20074b51a28"
            },
            {
                campaignId: campaign._id,
                name: "Test Token 2",
                image: "test_token2.png"
            },
            {
                campaignId: campaign._id,
                name: "Test Token 3",
                image: "test_token3.png"
            }
        ]

        const promise = new Promise((resolve) => resolve('yes'))

        promise.then(async () => {
            const promises = maps.map(async (map) => {return await authAPI(getAccessTokenSilently, { map }, dispatch, createMap)})
            tokens.forEach(async (token) => { await authAPI(getAccessTokenSilently, { token }, dispatch, createToken) })
            await Promise.all(promises)
        }).then(async () => {
            const promises = players.map(async (player) => {return await authAPI(getAccessTokenSilently, { player }, dispatch, createPlayer)})
            await Promise.all(promises)
        })
        .finally(() => {
            authAPI(getAccessTokenSilently, {}, dispatch, fetchCampaigns);
        })


    }

    return (
        <Button color="inherit" onClick={() => createFullCampaign()}>Fill Campaign</Button>
    )
}