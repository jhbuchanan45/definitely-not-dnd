import { useAuth0 } from '@auth0/auth0-react';
import { Button, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        backgroundColor: theme.palette.secondary.dark,
        color: "white"
    }
}))

interface Props {
    postFunc: Function,
    invalidate?: any,
    defaultItem: any,
    className?: any,
    label: string
}

const AddButton = (props: Props) => {
    const { button } = useStyles();

    const { getAccessTokenSilently: getAuthToken } = useAuth0();
    const queryClient = useQueryClient();

    const mutation = useMutation(async (newItem) => await props.postFunc(getAuthToken, newItem), {
        onSuccess: () => {
            if (props.invalidate) {
                console.log(props.invalidate)
                props.invalidate.forEach(element => {
                    queryClient.invalidateQueries(element);
                });
            }
        }
    })

    return (
        <Button className={`${props.className} ${button}`} variant="contained" onClick={() => {mutation.mutate(props.defaultItem)}}>{props.label}</Button>
    )
}

export default AddButton;
