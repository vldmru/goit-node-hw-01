const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("colors");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (e) {
    console.error(e.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result;
  } catch (e) {
    console.error(e.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removeContact = contacts.find((contact) => contact.id === contactId);
    const newContactList = contacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(newContactList));
    console.log(`Contact by id ${contactId} removed successfully`.green);
    return removeContact;
  } catch (e) {
    console.error(e.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: uuidv4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (e) {
    console.error(e.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
