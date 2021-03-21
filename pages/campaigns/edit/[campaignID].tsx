import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import campaignWrapper from '../../../components/campaigns/CampaignWrapper';
import { updateCampaign } from '../../../util/queries/update/updateDefault';
import { Formik, Form, Field, FieldArray, ArrayHelpers } from 'formik';
import { deleteCampaign } from '../../../util/queries/delete/deleteDefault';
import DeleteButton from '../../../components/DeleteButton';
import { Campaign } from '@jhbuchanan45/dnd-models';
import mongoose from 'mongoose/browser';

const EditCampaign = (props: any) => {
    const router = useRouter();
    const { campaignID } = router.query;

    const campaign = props.campaigns.find(({ _id }) => _id === campaignID);

    const { getAccessTokenSilently: getAuthToken } = useAuth0();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const campaignUpdate = updateCampaign(getAuthToken, useMutation, enqueueSnackbar, queryClient, campaignID);
    const campaignDelete = deleteCampaign(getAuthToken, useMutation, enqueueSnackbar, queryClient, campaignID);

    const submitUpdate = async (values, { setSubmitting }) => {
        await campaignUpdate.mutate(values);
        setSubmitting(false);
    }

    const validate = values => {
        const doc = new mongoose.Document({ ...values }, Campaign);
        let errors: any = doc.validateSync()?.errors;
        let formikErrors = {};
        if (errors) {
            for (const err in errors) {
                formikErrors[err] = errors[err].message;
            }
            console.log(formikErrors);
            return formikErrors;
        }
    }

    return (
        <>
            <DeleteButton onClick={campaignDelete.mutate}>Delete Me!</DeleteButton>
            <Formik initialValues={{ ...campaign }} onSubmit={submitUpdate} validate={validate}>
                {({ submitForm, values, isSubmitting, errors }) => (
                    <Form>
                        <Field component={TextField} fullWidth name="name" label="Name" variant="filled" color="secondary"></Field>
                        <Field component={TextField} fullWidth name="image" label="Image" variant="filled" color="secondary"></Field>
                        <Typography variant="h6">Who Can Read This</Typography>
                        <FieldArray name="readIds" render={arrayHelpers => (
                            <>
                                {
                                    values.readIds?.map((readIds, index) =>
                                    (<div>
                                        <Field component={TextField} name={`readIds.${index}`} label="Can Read" variant="filled" color="secondary" />
                                        <Button onClick={() => arrayHelpers.remove(index)}>Remove Reader</Button>
                                    </div>))
                                }
                                <Button onClick={() => arrayHelpers.push('')}>Add Reader</Button>

                            </>
                        )} />
                        <Typography variant="h6">Who Can Write To This</Typography>
                        <FieldArray name="writeIds" render={arrayHelpers => (
                            <>
                                {
                                    values.writeIds?.map((writeId, index) =>
                                    (<div>
                                        <Field component={TextField} name={`writeIds.${index}`} label="Can Write" variant="filled" color="secondary" />
                                        <Button onClick={() => arrayHelpers.remove(index)}>Remove Writer</Button>
                                    </div>))
                                }
                                <Button onClick={() => arrayHelpers.push('')}>Add Writer</Button>

                            </>
                        )} />
                        <Field component={TextField} fullWidth name="ownerId" disabled label="Owner ID" variant="filled" color="secondary" ></Field>
                        <Button disabled={isSubmitting} onClick={submitForm}>Yeet</Button>
                    </Form>)}
            </Formik>
        </>
    )
};

export default campaignWrapper(EditCampaign);
