import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    card: {
        width: 275,
    },
});

export default function ContactsList(props) {
    const classes = useStyles();
    let contactListItems = [];
    if (props.contacts && props.contacts.length > 0) {
        contactListItems = props.contacts.map((c) =>
            <Grid item xs={12} key={c.id}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {c.firstName} {c.lastName}
                        </Typography>
                        <Typography color="textSecondary">
                            {c.email}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => props.onEditContact(c)}>Edit</Button>
                        <Button onClick={() => props.onDeleteContact(c)}>Delete</Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    } else {
        contactListItems = [<Grid item xs={12} key="0">No contacts, add a contact to get started.</Grid>];
    }
    return (
        <Grid container spacing={2}>
            {contactListItems}
        </Grid>
    );
}
