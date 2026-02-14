import Contact from "../db/models/Contact.js";

export function listContacts() {
  return Contact.findAll();
}

export function getContactById(contactId) {
  return Contact.findByPk(contactId);
}

export async function removeContact(contactId) {
  const contact = await getContactById(contactId);

  if (contact) {
    await contact.destroy();
  }

  return contact;
}

export function addContact(data) {
  return Contact.create(data);
}

export async function updateContact(id, data) {
  const contact = await getContactById(id);

  if (contact) {
    await contact.update(data);
  }

  return contact;
}
