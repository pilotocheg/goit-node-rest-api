import Contact from "../db/models/Contact.js";

export function listContacts(where) {
  return Contact.findAll({ where });
}

export function getContact(where) {
  return Contact.findOne({ where });
}

export async function removeContact(where) {
  const contact = await getContact(where);

  if (contact) {
    await contact.destroy();
  }

  return contact;
}

export function addContact(data) {
  return Contact.create(data);
}

export async function updateContact(where, data) {
  const contact = await getContact(where);

  if (contact) {
    await contact.update(data);
  }

  return contact;
}
