import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    contactForm: {
        '& > *': {
            margin: theme.spacing(1),
        },
        width: "400px",
    },
    inputField: {
        width: "100%",
    },
    inputFieldContainer: {
        width: "95%",
        buttonsContainer: {
            justify: "right"
        }
    },
}));

export default function ContactForm(props) {
    const id = props.contact?.id;
    const [firstName, setFirstName] = useState(props.contact?.firstName);
    const [lastName, setLastName] = useState(props.contact?.lastName);
    const [email, setEmail] = useState(props.contact?.email);
    const classes = useStyles();

    function onClickSave() {
        const newContact = {id, firstName, lastName, email};
        props.onClickSave(newContact);
        clear();
    }

    function clear() {
        setFirstName("");
        setLastName("");
        setEmail("");
    }

    function onClickCancel() {
        clear();
        props.onClickCancel();
    }

    return (
        <div className={classes.contactForm}>
            <div className={classes.inputFieldContainer}>
                <TextField label="First name" value={firstName} variant="filled" className={classes.inputField}
                       onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className={classes.inputFieldContainer}>
                <TextField label="Last name" value={lastName} variant="filled" className={classes.inputField}
                       onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className={classes.inputFieldContainer}>
                <TextField label="Email address" value={email} variant="filled" type="email" className={classes.inputField}
                       onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={classes.buttonsContainer}>
                <Button onClick={onClickSave}>{props.saveButtonText}</Button>
                <Button onClick={onClickCancel}>{props.cancelButtonText}</Button>
            </div>
        </div>
    );
}
