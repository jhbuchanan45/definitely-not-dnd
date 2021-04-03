import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import CharacterSheet from '../../../../components/tokens/CharacterSheet';
import { usePlayer } from '../../../../util/queries/fetch/fetchDefault';
import { updatePlayer } from '../../../../util/queries/update/updateDefault';

const PlayerViewer = () => {
    const router = useRouter();
    const { campaignID, playerID } = router.query;
    const { enqueueSnackbar } = useSnackbar();
    const { getAccessTokenSilently: getAuthToken } = useAuth0();
    const queryClient = useQueryClient();

    const { data: player } = usePlayer(getAuthToken, useQuery, enqueueSnackbar, playerID);

    const playerUpdate = updatePlayer(getAuthToken, useMutation, enqueueSnackbar, queryClient, playerID);

    return (
        <>
            {player?.token && <CharacterSheet token={player} update={playerUpdate} />}
        </>
    )
}

export default PlayerViewer;
