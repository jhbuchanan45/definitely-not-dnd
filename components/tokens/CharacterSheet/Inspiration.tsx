import { Container, Switch, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
    inspiration: boolean,
    update: any
}

const Inspiration = (props: Props) => {
    return (
        <>
            <Container>
                <Typography variant="h5"><Switch checked={props.inspiration} onChange={() => props.update.mutate({ inspiration: !props.inspiration })} />
                Inspiration</Typography>
            </Container>
        </>
    )
}

export default Inspiration;
