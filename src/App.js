import './App.css';
import React from "react";
import ContactsList from './ContactsList';
import ContactForm from "./ContactForm";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as api from "./api";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function App() {
    const [contacts, setContacts] = React.useState(null);
    const [addContactFormOpen, setAddContactFormOpen] = React.useState(false);
    const [editContactFormOpen, setEditContactFormOpen] = React.useState(false);
    const [contactBeingEdited, setContactBeingEdited] = React.useState(null);
    const classes = useStyles();

    React.useEffect(() => {
        if (contacts === null) {
            // TODO: use something more complex than just an array for contacts state, so that we can edit/update
            // individual items without pulling the whole list again
            api.getContacts().then(d => setContacts(d));
        }
    });

    function addContact(newContact) {
        setAddContactFormOpen(false);
        api.addContact(newContact).then((c) => addOrEditContact(c));
    }

    function editContact(contact) {
        setEditContactFormOpen(false);
        api.editContact(contact).then((c) => addOrEditContact(c));
    }

    function addOrEditContact(contact) {
        setContacts(null);
    }

    function openAddContactForm() {
        setAddContactFormOpen(true);
    }

    function openEditContactForm(contact) {
        setContactBeingEdited(contact);
        setEditContactFormOpen(true);
    }

    function deleteContact(contact) {
        api.deleteContact(contact).then(() => {
            delete contacts[contact.id];
            setContacts(null);
        });
    }

    return (
        <Container maxWidth="sm">
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <h1>Contact List</h1>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={openAddContactForm}>Add Contact</Button>
                </Grid>
                <Grid item xs={12}>
                    <ContactsList contacts={contacts}
                                  onEditContact={openEditContactForm}
                                  onDeleteContact={deleteContact}/>
                </Grid>
            </Grid>
            <Dialog open={addContactFormOpen}>
                <DialogTitle>Add Contact</DialogTitle>
                <ContactForm onClickSave={(c) => addContact(c)}
                             onClickCancel={() => setAddContactFormOpen(false)}
                             saveButtonText="Add"
                             cancelButtonText="Cancel"/>
            </Dialog>
            <Dialog open={editContactFormOpen}>
                <DialogTitle>Edit Contact</DialogTitle>
                <ContactForm contact={contactBeingEdited}
                             onClickSave={(c) => editContact(c)}
                             onClickCancel={() => setEditContactFormOpen(false)}
                             saveButtonText="Save"
                             cancelButtonText="Cancel"/>
            </Dialog>
        </Container>
    );
}

export default App;
