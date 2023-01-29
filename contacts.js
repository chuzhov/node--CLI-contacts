const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const MOCK_DB_DIRECTORY = "db";
const MOCK_DB_FILENAME = "contacts.json";

const contactsPath = path.join(
  __dirname,
  MOCK_DB_DIRECTORY,
  MOCK_DB_FILENAME
);

// TODO: задокументувати кожну функцію
async function listContacts() {
  const contacts = await fs.readFile(
    contactsPath
  );
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (c) => c.id === contactId
  );
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (index === -1) return null;
  const [response] = contacts.splice(index, 1);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return response;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
