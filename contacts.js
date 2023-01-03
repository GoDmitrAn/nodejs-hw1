const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function readDb() {
  try {
    const dbRaw = await fs.readFile(contactsPath, "utf8");
    const db = JSON.parse(dbRaw);
    return db;
  } catch (error) {
    console.log("Please reload", error);
  }
}
async function writeDb(db) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.log(error);
  }
}

async function listContacts() {
  try {
    list = await readDb();
    return list;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const db = await readDb();
    let contact = db.find((element) => element.id === String(contactId));

    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const db = await readDb();
    index = db.findIndex((element) => element.id === String(contactId));
    db.splice(index, 1);
    await writeDb(db);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    id = nanoid();
    const contactUser = { id, name, email, phone };
    const db = await readDb();
    db.push(contactUser);
    await writeDb(db);
  } catch (error) {
    console.log(error);
  }
}
module.exports = { listContacts, getContactById, removeContact, addContact };
