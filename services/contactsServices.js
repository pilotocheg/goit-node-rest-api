import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const __dirname = import.meta.dirname;
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function readContacts() {
  const rawContacts = await fs.readFile(contactsPath, { encoding: "utf8" });

  return JSON.parse(rawContacts);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), {
    encoding: "utf8",
  });
}

export async function listContacts() {
  return readContacts();
}

export async function getContactById(contactId) {
  const contacts = await readContacts();
  return contacts.find((c) => c.id === contactId) || null;
}

export async function removeContact(contactId) {
  const contacts = await readContacts();

  let deletedContact = null;
  const updatedContacts = contacts.filter((c) => {
    if (c.id === contactId) {
      deletedContact = c;
      return false;
    }
    return true;
  });
  if (deletedContact) {
    await writeContacts(updatedContacts);
  }
  return deletedContact;
}

export async function addContact(name, email, phone) {
  const contacts = await readContacts();

  let newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

export async function updateContact(id, data) {
  const contacts = await readContacts();

  let updatedContact = null;
  const contactIndex = contacts.findIndex((c) => c.id === id);

  if (contactIndex !== -1) {
    updatedContact = { ...contacts[contactIndex], ...data };
    contacts[contactIndex] = updatedContact;

    await writeContacts(contacts);
  }

  return updatedContact;
}
