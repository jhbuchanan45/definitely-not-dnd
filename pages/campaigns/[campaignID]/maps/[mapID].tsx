import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import MapBrief from '../../../../components/campaigns/MapBrief';
import { useMap } from '../../../../util/queries/fetch/fetchDefault';
import { updateMap } from '../../../../util/queries/update/updateDefault';

const ViewMap = () => {
    const router = useRouter();
    const { campaignID, mapID } = router.query;
    const { enqueueSnackbar } = useSnackbar();
    const { getAccessTokenSilently: getAuthToken } = useAuth0();
    const queryClient = useQueryClient();

    console.log(router.query);

    const { data: map } = useMap(getAuthToken, useQuery, enqueueSnackbar, mapID);

    const mapUpdate = updateMap(getAuthToken, useMutation, enqueueSnackbar, queryClient, mapID)

    const submitUpdate = async (values, { setSubmitting }) => {
        console.log(values);
        await mapUpdate.mutate(values);
        setSubmitting(false);
    }

    return (map ?
        <>
            <MapBrief map={map}></MapBrief>
            <Formik initialValues={{ ...map }} onSubmit={submitUpdate} validate={values => { }}>
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Field component={TextField} fullWidth name="campaignId" label="Campaign ID" variant="filled" color="secondary" />
                        <Field component={TextField} fullWidth name="name" label="Name" variant="filled" color="secondary" />
                        <Field component={TextField} fullWidth name="image" label="Image" variant="filled" color="secondary" />
                        <Field component={TextField} fullWidth name="sqSize" label="Square Size" variant="filled" color="secondary" />
                        <Field component={TextField} fullWidth name="writeIds" disabled label="Can Write" variant="filled" color="secondary" />
                        <Field component={TextField} fullWidth name="readIds" disabled label="Can Write" variant="filled" color="secondary" />
                        <Field component={TextField} fullWidth name="ownerId" disabled label="Owner ID" variant="filled" color="secondary" />
                        <Button disabled={isSubmitting} onClick={submitForm}>Yeet</Button>
                    </Form>)}
            </Formik>
        </>
        : (<div>Blank</div>)
    )
}

export default ViewMap;
