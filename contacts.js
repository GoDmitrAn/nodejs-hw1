const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function readDb() {
  const dbRaw = await fs.readFile(contactsPath, "utf8");
  const db = JSON.parse(dbRaw);
  return db;
}
async function writeDb(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  list = await readDb();
  return list;
}

async function getContactById(contactId) {
  const db = await readDb();
  let contact = db.find((element) => element.id === String(contactId));

  return contact;
}

async function removeContact(contactId) {
  const db = await readDb();
  index = db.findIndex((element) => element.id === String(contactId));
  db.splice(index, 1);
  await writeDb(db);
}

async function addContact(name, email, phone) {
  id = nanoid();
  const contactUser = { id, name, email, phone };
  const db = await readDb();
  db.push(contactUser);
  await writeDb(db);
}
module.exports = { listContacts, getContactById, removeContact, addContact };
