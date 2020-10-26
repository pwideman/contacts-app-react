
export function getContacts() {
    return fetch("http://localhost:8080/contacts/")
        .then(r => r.json());
}

export function addContact(newContact) {
    return fetch("http://localhost:8080/contacts/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact)
    }).then(r => r.json());
}

export function editContact(contact) {
    return fetch("http://localhost:8080/contacts/" + contact.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact)
    }).then(r => r.json());
}

export function deleteContact(contact) {
    return fetch("http://localhost:8080/contacts/" + contact.id, {
        method: "DELETE",
    });
}
