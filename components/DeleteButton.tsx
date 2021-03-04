import { useAuth0 } from '@auth0/auth0-react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { deleteCampaign } from '../util/queries/delete/deleteDefault';

interface Props {
    onClick: Function,
    children: any,

}

const DeleteButton = (props: Props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const handleClickApprove = () => {
        props.onClick();
        setOpen(false);
    }

    return (
        <>
            <Button onClick={handleClickOpen}>{props.children}</Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>{"Please confirm this delete request:"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleClickApprove}>Approve</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteButton;
